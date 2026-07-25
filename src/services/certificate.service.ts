import type { Certificate } from "@/generated/prisma/client";
import { ConflictError, ValidationError } from "@/lib/errors";
import { buildMemoPayload, sha256Hex, toCanonicalJson } from "@/lib/hash";
import { getServerConnection } from "@/lib/solana";
import { certificateRepository } from "@/repositories/certificate.repository";
import {
  buildUnsignedMemoTransaction,
  serializeTransactionToBase64,
  verifyMemoTransaction,
} from "@/services/solana-memo.service";
import type { CertificateDto, PrepareCertificateResponse } from "@/types/certificate";
import type { ConfirmCertificateInput, PrepareStatementInput } from "@/validators/certificate";
import { MAX_FILE_SIZE_BYTES } from "@/validators/certificate";
import { PublicKey } from "@solana/web3.js";

function toDto(certificate: Certificate): CertificateDto {
  return {
    id: certificate.id,
    title: certificate.title,
    description: certificate.description,
    recipientName: certificate.recipientName,
    sourceType: certificate.sourceType as CertificateDto["sourceType"],
    fileName: certificate.fileName,
    fileSize: certificate.fileSize,
    mimeType: certificate.mimeType,
    documentHash: certificate.documentHash,
    walletAddress: certificate.walletAddress,
    transactionSignature: certificate.transactionSignature,
    network: certificate.network,
    createdAt: certificate.createdAt.toISOString(),
  };
}

async function prepareTransaction(walletAddress: string, hash: string) {
  const connection = getServerConnection();
  const memo = buildMemoPayload(hash);
  const transaction = await buildUnsignedMemoTransaction(
    connection,
    new PublicKey(walletAddress),
    memo,
  );
  return { memo, transaction: serializeTransactionToBase64(transaction) };
}

async function prepareStatement(
  input: PrepareStatementInput,
): Promise<PrepareCertificateResponse> {
  const issuedAt = new Date().toISOString();
  const hash = sha256Hex(
    toCanonicalJson({
      title: input.title,
      description: input.description,
      recipientName: input.recipientName,
      walletAddress: input.walletAddress,
      issuedAt,
    }),
  );

  const existing = await certificateRepository.findByHash(hash);
  if (existing) {
    throw new ConflictError("Este certificado já foi registrado anteriormente.");
  }

  const { memo, transaction } = await prepareTransaction(input.walletAddress, hash);

  return {
    hash,
    issuedAt,
    memo,
    transaction,
    title: input.title,
    description: input.description,
    recipientName: input.recipientName,
    sourceType: "statement",
    fileName: null,
    fileSize: null,
    mimeType: null,
  };
}

interface PrepareDocumentInput {
  title: string;
  description: string | null;
  recipientName: string | null;
  walletAddress: string;
  file: File;
}

async function prepareDocument(
  input: PrepareDocumentInput,
): Promise<PrepareCertificateResponse> {
  if (input.file.size > MAX_FILE_SIZE_BYTES) {
    throw new ValidationError("O arquivo excede o limite de 10MB.");
  }

  const issuedAt = new Date().toISOString();
  const buffer = Buffer.from(await input.file.arrayBuffer());
  const hash = sha256Hex(buffer);

  const existing = await certificateRepository.findByHash(hash);
  if (existing) {
    throw new ConflictError("Este arquivo já foi certificado anteriormente.");
  }

  const { memo, transaction } = await prepareTransaction(input.walletAddress, hash);

  return {
    hash,
    issuedAt,
    memo,
    transaction,
    title: input.title,
    description: input.description,
    recipientName: input.recipientName,
    sourceType: "document",
    fileName: input.file.name,
    fileSize: input.file.size,
    mimeType: input.file.type || null,
  };
}

function recomputeStatementHash(input: ConfirmCertificateInput): string {
  return sha256Hex(
    toCanonicalJson({
      title: input.title,
      description: input.description,
      recipientName: input.recipientName,
      walletAddress: input.walletAddress,
      issuedAt: input.issuedAt,
    }),
  );
}

async function confirm(input: ConfirmCertificateInput): Promise<CertificateDto> {
  if (input.sourceType === "statement") {
    const expectedHash = recomputeStatementHash(input);
    if (expectedHash !== input.hash) {
      throw new ValidationError(
        "Os dados do certificado não correspondem ao hash informado.",
      );
    }
  }

  const alreadyExists = await certificateRepository.findBySignature(input.signature);
  if (alreadyExists) {
    return toDto(alreadyExists);
  }

  const hashConflict = await certificateRepository.findByHash(input.hash);
  if (hashConflict) {
    throw new ConflictError("Este certificado já foi registrado anteriormente.");
  }

  const connection = getServerConnection();
  const verification = await verifyMemoTransaction({
    connection,
    signature: input.signature,
    expectedMemo: buildMemoPayload(input.hash),
    expectedFeePayer: input.walletAddress,
  });

  if (!verification.ok) {
    throw new ValidationError(verification.reason);
  }

  const certificate = await certificateRepository.create({
    title: input.title,
    description: input.description,
    recipientName: input.recipientName,
    sourceType: input.sourceType,
    fileName: input.fileName,
    fileSize: input.fileSize,
    mimeType: input.mimeType,
    documentHash: input.hash,
    walletAddress: input.walletAddress,
    transactionSignature: input.signature,
    createdAt: new Date(input.issuedAt),
  });

  return toDto(certificate);
}

async function getById(id: string): Promise<CertificateDto | null> {
  const certificate = await certificateRepository.findById(id);
  return certificate ? toDto(certificate) : null;
}

async function getByWallet(walletAddress: string): Promise<CertificateDto[]> {
  const certificates = await certificateRepository.findManyByWallet(walletAddress);
  return certificates.map(toDto);
}

async function findByHashOrSignature(query: string): Promise<CertificateDto | null> {
  const certificate =
    (await certificateRepository.findByHash(query)) ??
    (await certificateRepository.findBySignature(query));
  return certificate ? toDto(certificate) : null;
}

export const certificateService = {
  prepareStatement,
  prepareDocument,
  confirm,
  getById,
  getByWallet,
  findByHashOrSignature,
};

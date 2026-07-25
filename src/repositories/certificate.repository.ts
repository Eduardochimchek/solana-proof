import { prisma } from "@/lib/prisma";
import { SOLANA_NETWORK } from "@/lib/solana";
import type { CertificateSourceType } from "@/types/certificate";

export interface CreateCertificateInput {
  title: string;
  description: string | null;
  recipientName: string | null;
  sourceType: CertificateSourceType;
  fileName: string | null;
  fileSize: number | null;
  mimeType: string | null;
  documentHash: string;
  walletAddress: string;
  transactionSignature: string;
  createdAt: Date;
}

export const certificateRepository = {
  create(input: CreateCertificateInput) {
    return prisma.certificate.create({
      data: { ...input, network: SOLANA_NETWORK },
    });
  },

  findById(id: string) {
    return prisma.certificate.findUnique({ where: { id } });
  },

  findByHash(documentHash: string) {
    return prisma.certificate.findUnique({ where: { documentHash } });
  },

  findBySignature(transactionSignature: string) {
    return prisma.certificate.findUnique({ where: { transactionSignature } });
  },

  findManyByWallet(walletAddress: string) {
    return prisma.certificate.findMany({
      where: { walletAddress },
      orderBy: { createdAt: "desc" },
    });
  },

  count() {
    return prisma.certificate.count();
  },
};

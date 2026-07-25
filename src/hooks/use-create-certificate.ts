import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { base64ToUint8Array } from "@/lib/base64";
import { isTransactionExpiredError, toWalletErrorMessage } from "@/lib/wallet-errors";
import type { CertificateDto, PrepareCertificateResponse } from "@/types/certificate";

export interface CreateCertificateInput {
  title: string;
  description?: string;
  recipientName?: string;
  file?: File | null;
}

async function readErrorMessage(response: Response, fallback: string): Promise<string> {
  const body = await response.json().catch(() => null);
  return body?.message ?? fallback;
}

async function prepareCertificate(
  input: CreateCertificateInput,
  walletAddress: string,
): Promise<PrepareCertificateResponse> {
  const formData = new FormData();
  formData.set("title", input.title);
  if (input.description) formData.set("description", input.description);
  if (input.recipientName) formData.set("recipientName", input.recipientName);
  formData.set("walletAddress", walletAddress);
  if (input.file) formData.set("file", input.file);

  const response = await fetch("/api/certificates/prepare", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, "Não foi possível preparar o certificado."));
  }

  return response.json();
}

async function confirmCertificate(payload: {
  signature: string;
  walletAddress: string;
  prepared: PrepareCertificateResponse;
}): Promise<CertificateDto> {
  const { signature, walletAddress, prepared } = payload;

  const response = await fetch("/api/certificates/confirm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      signature,
      hash: prepared.hash,
      walletAddress,
      title: prepared.title,
      description: prepared.description,
      recipientName: prepared.recipientName,
      sourceType: prepared.sourceType,
      fileName: prepared.fileName,
      fileSize: prepared.fileSize,
      mimeType: prepared.mimeType,
      issuedAt: prepared.issuedAt,
    }),
  });

  if (!response.ok) {
    throw new Error(
      await readErrorMessage(response, "Não foi possível confirmar o certificado."),
    );
  }

  return response.json();
}

export function useCreateCertificate() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateCertificateInput): Promise<CertificateDto> => {
      if (!publicKey) {
        throw new Error("Conecte sua carteira para criar um certificado.");
      }

      const walletAddress = publicKey.toBase58();
      const toastId = toast.loading("Gerando hash do certificado...");

      try {
        const prepared = await prepareCertificate(input, walletAddress);

        toast.loading("Aguardando assinatura na carteira...", { id: toastId });
        const transaction = Transaction.from(base64ToUint8Array(prepared.transaction));

        // The server builds the transaction with a blockhash that may expire while
        // the user reviews the Phantom prompt. Refresh it immediately before send.
        const { blockhash, lastValidBlockHeight } =
          await connection.getLatestBlockhash("confirmed");
        transaction.recentBlockhash = blockhash;
        transaction.lastValidBlockHeight = lastValidBlockHeight;

        const signature = await sendTransaction(transaction, connection);

        toast.loading("Confirmando na blockchain Solana...", { id: toastId });
        try {
          await connection.confirmTransaction(
            { signature, blockhash, lastValidBlockHeight },
            "confirmed",
          );
        } catch (confirmError) {
          if (isTransactionExpiredError(confirmError)) {
            const status = await connection.getSignatureStatus(signature);
            const landed =
              status.value?.confirmationStatus === "confirmed" ||
              status.value?.confirmationStatus === "finalized";
            if (!landed) throw confirmError;
          } else {
            throw confirmError;
          }
        }

        const certificate = await confirmCertificate({ signature, walletAddress, prepared });

        toast.success("Certificado registrado on-chain.", { id: toastId });
        return certificate;
      } catch (error) {
        toast.error(toWalletErrorMessage(error), { id: toastId });
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    },
  });
}

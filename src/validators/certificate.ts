import { z } from "zod";

import { isValidPublicKey, isValidTransactionSignature } from "@/lib/solana";

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

const walletAddressSchema = z
  .string()
  .trim()
  .refine(isValidPublicKey, "Endereço de carteira inválido.");

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => (value ? value : null));

export const prepareStatementSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "O título deve ter pelo menos 3 caracteres.")
    .max(120, "O título deve ter no máximo 120 caracteres."),
  description: optionalText(500),
  recipientName: optionalText(120),
  walletAddress: walletAddressSchema,
});

export type PrepareStatementInput = z.infer<typeof prepareStatementSchema>;

export const confirmCertificateSchema = z.object({
  signature: z
    .string()
    .trim()
    .refine(isValidTransactionSignature, "Assinatura de transação inválida."),
  hash: z.string().length(64, "Hash SHA-256 inválido."),
  walletAddress: walletAddressSchema,
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().max(500).nullable(),
  recipientName: z.string().trim().max(120).nullable(),
  sourceType: z.enum(["statement", "document"]),
  fileName: z.string().trim().max(255).nullable(),
  fileSize: z.number().int().positive().max(MAX_FILE_SIZE_BYTES).nullable(),
  mimeType: z.string().trim().max(120).nullable(),
  issuedAt: z.iso.datetime(),
});

export type ConfirmCertificateInput = z.infer<typeof confirmCertificateSchema>;

export const verifyLookupSchema = z.object({
  query: z.string().trim().min(3, "Informe um hash, assinatura ou ID de certificado."),
});

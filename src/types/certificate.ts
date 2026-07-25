export type CertificateSourceType = "statement" | "document";

export interface CertificateDto {
  id: string;
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
  network: string;
  createdAt: string;
}

export interface PrepareCertificateResponse {
  hash: string;
  issuedAt: string;
  memo: string;
  transaction: string;
  title: string;
  description: string | null;
  recipientName: string | null;
  sourceType: CertificateSourceType;
  fileName: string | null;
  fileSize: number | null;
  mimeType: string | null;
}

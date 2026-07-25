import { useMutation } from "@tanstack/react-query";

import type { CertificateDto } from "@/types/certificate";

async function verifyCertificate(query: string): Promise<CertificateDto> {
  const response = await fetch(
    `/api/certificates/verify?query=${encodeURIComponent(query)}`,
  );
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? "Certificado não encontrado.");
  }
  return response.json();
}

export function useVerifyCertificate() {
  return useMutation({ mutationFn: verifyCertificate });
}

import { useQuery } from "@tanstack/react-query";

import type { CertificateDto } from "@/types/certificate";

async function fetchCertificate(id: string): Promise<CertificateDto> {
  const response = await fetch(`/api/certificates/${id}`);
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? "Certificado não encontrado.");
  }
  return response.json();
}

export function useCertificate(id: string) {
  return useQuery({
    queryKey: ["certificates", id],
    queryFn: () => fetchCertificate(id),
    enabled: Boolean(id),
    retry: false,
  });
}

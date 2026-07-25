import { useWallet } from "@solana/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";

import type { CertificateDto } from "@/types/certificate";

async function fetchCertificatesByWallet(walletAddress: string): Promise<CertificateDto[]> {
  const response = await fetch(`/api/certificates?wallet=${walletAddress}`);
  if (!response.ok) {
    throw new Error("Não foi possível carregar seus certificados.");
  }
  return response.json();
}

export function useCertificatesByWallet() {
  const { publicKey } = useWallet();
  const walletAddress = publicKey?.toBase58();

  return useQuery({
    queryKey: ["certificates", "wallet", walletAddress],
    queryFn: () => fetchCertificatesByWallet(walletAddress!),
    enabled: Boolean(walletAddress),
  });
}

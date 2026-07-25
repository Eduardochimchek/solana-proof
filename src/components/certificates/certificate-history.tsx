"use client";

import { FileX2, Search, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";

import { CertificateCard } from "@/components/certificates/certificate-card";
import { ButtonLink } from "@/components/shared/button-link";
import { EmptyState } from "@/components/shared/empty-state";
import { WalletGate } from "@/components/shared/wallet-gate";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useCertificatesByWallet } from "@/hooks/use-certificates-by-wallet";

export function CertificateHistory() {
  const { data, isLoading, isError } = useCertificatesByWallet();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!data) return [];
    const term = search.trim().toLowerCase();
    if (!term) return data;
    return data.filter(
      (certificate) =>
        certificate.title.toLowerCase().includes(term) ||
        certificate.documentHash.toLowerCase().includes(term),
    );
  }, [data, search]);

  return (
    <WalletGate description="Conecte sua carteira para ver o histórico completo de certificados.">
      <div className="space-y-6">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por título ou hash..."
        />

        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-[68px] w-full rounded-xl" />
            ))}
          </div>
        )}

        {isError && (
          <EmptyState
            icon={ShieldAlert}
            title="Não foi possível carregar seus certificados"
            description="Tente novamente em instantes."
          />
        )}

        {!isLoading && !isError && filtered.length === 0 && (
          <EmptyState
            icon={FileX2}
            title={search ? "Nenhum resultado encontrado" : "Nenhum certificado ainda"}
            description={
              search
                ? "Tente buscar por outro termo."
                : "Crie seu primeiro certificado on-chain em menos de um minuto."
            }
            action={
              !search && (
                <ButtonLink href="/create" size="sm" className="gap-2">
                  <Search className="size-4" />
                  Criar certificado
                </ButtonLink>
              )
            }
          />
        )}

        {!isLoading && !isError && filtered.length > 0 && (
          <div className="space-y-3">
            {filtered.map((certificate) => (
              <CertificateCard key={certificate.id} certificate={certificate} />
            ))}
          </div>
        )}
      </div>
    </WalletGate>
  );
}

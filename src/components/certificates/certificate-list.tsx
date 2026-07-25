"use client";

import { FileX2, ShieldAlert, Sparkles } from "lucide-react";

import { CertificateCard } from "@/components/certificates/certificate-card";
import { ButtonLink } from "@/components/shared/button-link";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useCertificatesByWallet } from "@/hooks/use-certificates-by-wallet";

export function CertificateList({ limit }: { limit?: number }) {
  const { data, isLoading, isError } = useCertificatesByWallet();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: limit ?? 4 }).map((_, index) => (
          <Skeleton key={index} className="h-[68px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        icon={ShieldAlert}
        title="Não foi possível carregar seus certificados"
        description="Tente novamente em instantes."
      />
    );
  }

  const certificates = limit ? data?.slice(0, limit) : data;

  if (!certificates || certificates.length === 0) {
    return (
      <EmptyState
        icon={FileX2}
        title="Nenhum certificado ainda"
        description="Crie seu primeiro certificado on-chain em menos de um minuto."
        action={
          <ButtonLink href="/create" size="sm" className="gap-2">
            <Sparkles className="size-4" />
            Criar certificado
          </ButtonLink>
        }
      />
    );
  }

  return (
    <div className="space-y-3">
      {certificates.map((certificate) => (
        <CertificateCard key={certificate.id} certificate={certificate} />
      ))}
    </div>
  );
}

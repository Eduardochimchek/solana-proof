"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FileStack, Sparkles, Wifi } from "lucide-react";

import { CertificateList } from "@/components/certificates/certificate-list";
import { ButtonLink } from "@/components/shared/button-link";
import { WalletGate } from "@/components/shared/wallet-gate";
import { StatsCard } from "@/components/dashboard/stats-card";
import { useCertificatesByWallet } from "@/hooks/use-certificates-by-wallet";
import { SOLANA_NETWORK } from "@/lib/solana";

export function DashboardOverview() {
  const { data } = useCertificatesByWallet();

  const total = data?.length ?? 0;
  const lastIssuedAt = data?.[0]?.createdAt;

  return (
    <WalletGate description="Conecte sua carteira para ver seu painel e certificados.">
      <div className="space-y-10">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatsCard icon={FileStack} label="Certificados emitidos" value={String(total)} />
          <StatsCard icon={Wifi} label="Rede" value={SOLANA_NETWORK} />
          <StatsCard
            icon={Sparkles}
            label="Última emissão"
            value={
              lastIssuedAt
                ? format(new Date(lastIssuedAt), "dd MMM yyyy", { locale: ptBR })
                : "—"
            }
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Certificados recentes</h2>
            {total > 0 && (
              <ButtonLink href="/history" variant="ghost" size="sm">
                Ver histórico completo
              </ButtonLink>
            )}
          </div>
          <CertificateList limit={5} />
        </div>
      </div>
    </WalletGate>
  );
}

import type { Metadata } from "next";

import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { ButtonLink } from "@/components/shared/button-link";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Painel",
  description: "Acompanhe seus certificados emitidos na Solana Proof.",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <PageHeader
        title="Painel"
        description="Visão geral dos certificados emitidos pela sua carteira."
        actions={<ButtonLink href="/create">Novo certificado</ButtonLink>}
      />
      <div className="mt-10">
        <DashboardOverview />
      </div>
    </div>
  );
}

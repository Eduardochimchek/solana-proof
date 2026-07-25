import type { Metadata } from "next";

import { VerifySearchForm } from "@/components/certificates/verify-search-form";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Verificar certificado",
  description:
    "Verifique a autenticidade de qualquer certificado emitido pela Solana Proof.",
};

interface VerifyPageProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const { query } = await searchParams;

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16">
      <PageHeader
        title="Verificar certificado"
        description="Cole o hash, a assinatura da transação ou o ID do certificado para confirmar sua autenticidade diretamente na blockchain."
      />
      <div className="mt-10">
        <VerifySearchForm initialQuery={query} />
      </div>
    </div>
  );
}

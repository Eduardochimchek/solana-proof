import type { Metadata } from "next";

import { CertificateHistory } from "@/components/certificates/certificate-history";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Histórico",
  description: "Consulte todos os certificados emitidos pela sua carteira.",
};

export default function HistoryPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <PageHeader
        title="Histórico de certificados"
        description="Todos os certificados emitidos pela carteira conectada, do mais recente ao mais antigo."
      />
      <div className="mt-10">
        <CertificateHistory />
      </div>
    </div>
  );
}

import type { Metadata } from "next";

import { CertificateForm } from "@/components/certificates/certificate-form";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Criar certificado",
  description:
    "Gere um certificado digital com prova criptográfica ancorada na Solana Devnet.",
};

export default function CreatePage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16">
      <PageHeader
        title="Criar certificado"
        description="Preencha os dados abaixo. Um hash SHA-256 será gerado e registrado permanentemente na Solana Devnet."
      />
      <div className="mt-10">
        <CertificateForm />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CertificateProof } from "@/components/certificates/certificate-proof";
import { certificateService } from "@/services/certificate.service";

interface CertificatePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CertificatePageProps): Promise<Metadata> {
  const { id } = await params;
  const certificate = await certificateService.getById(id);

  if (!certificate) {
    return { title: "Certificado não encontrado" };
  }

  return {
    title: certificate.title,
    description: `Certificado verificado on-chain na Solana Devnet — hash ${certificate.documentHash}.`,
  };
}

export default async function CertificatePage({ params }: CertificatePageProps) {
  const { id } = await params;
  const certificate = await certificateService.getById(id);

  if (!certificate) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16">
      <CertificateProof certificate={certificate} />
    </div>
  );
}

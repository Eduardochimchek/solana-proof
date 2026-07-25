import { ArrowRight, Sparkles } from "lucide-react";

import { CertificatePreview } from "@/components/landing/certificate-preview";
import { ButtonLink } from "@/components/shared/button-link";

export function HeroSection() {
  return (
    <section className="bg-grid-fade relative overflow-hidden border-b border-border/60">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:py-32">
        <div className="flex flex-col items-start gap-6">
          <span className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-brand-green" />
            Rodando na Solana Devnet
          </span>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Prove a existência de qualquer documento,{" "}
            <span className="text-gradient-brand">para sempre</span>.
          </h1>

          <p className="max-w-lg text-lg text-muted-foreground">
            Solana Proof gera uma impressão digital criptográfica do seu
            certificado e a ancora permanentemente na blockchain Solana.
            Verificável por qualquer pessoa, a qualquer momento — sem
            intermediários.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/create" size="lg" className="gap-2">
              Criar certificado
              <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="/verify" size="lg" variant="outline">
              Verificar um certificado
            </ButtonLink>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
            <span>Não-custodial</span>
            <span className="text-border">•</span>
            <span>Hash SHA-256</span>
            <span className="text-border">•</span>
            <span>Verificação instantânea</span>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <CertificatePreview />
        </div>
      </div>
    </section>
  );
}

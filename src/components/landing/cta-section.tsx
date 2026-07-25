import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/shared/button-link";

export function CtaSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/60 px-8 py-16 text-center">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, var(--brand-purple), transparent 60%)",
            }}
          />
          <div className="relative flex flex-col items-center gap-6">
            <h2 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Pronto para emitir seu primeiro certificado on-chain?
            </h2>
            <p className="max-w-md text-muted-foreground">
              Leva menos de um minuto. Tudo o que você precisa é da carteira
              Phantom.
            </p>
            <ButtonLink href="/create" size="lg" className="gap-2">
              Começar agora
              <ArrowRight className="size-4" />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

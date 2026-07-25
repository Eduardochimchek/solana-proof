import { Eye, Fingerprint, Lock, Rocket, Search, ShieldOff } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";

const FEATURES = [
  {
    icon: Lock,
    title: "Não-custodial por design",
    description:
      "Sua carteira assina e paga a própria transação. A plataforma nunca tem acesso às suas chaves privadas.",
  },
  {
    icon: ShieldOff,
    title: "Privacidade em primeiro lugar",
    description:
      "Nunca armazenamos o conteúdo dos seus arquivos, apenas sua impressão digital criptográfica.",
  },
  {
    icon: Fingerprint,
    title: "Prova criptográfica real",
    description:
      "Cada certificado é identificado por um hash SHA-256 único, resistente a colisões e adulterações.",
  },
  {
    icon: Search,
    title: "Verificação pública",
    description:
      "Qualquer pessoa pode validar um certificado pelo hash, assinatura ou link direto, sem precisar de conta.",
  },
  {
    icon: Eye,
    title: "Totalmente auditável",
    description:
      "Toda transação pode ser conferida de forma independente no Solana Explorer, a qualquer momento.",
  },
  {
    icon: Rocket,
    title: "Confirmação em segundos",
    description:
      "Aproveite a alta performance da Solana para registrar e confirmar certificados quase instantaneamente.",
  },
];

export function FeaturesSection() {
  return (
    <section className="border-b border-border/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Por que Solana Proof"
          title="Construído para confiança e transparência"
          description="Cada decisão de arquitetura prioriza segurança, privacidade e verificabilidade."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border/80 bg-card/40 p-6 transition-colors hover:border-border"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-accent">
                <feature.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

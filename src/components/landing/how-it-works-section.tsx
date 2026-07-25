import { FileSignature, Link2, ShieldCheck, Wallet2 } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";

const STEPS = [
  {
    icon: Wallet2,
    title: "Conecte sua carteira",
    description:
      "Use a Phantom para se autenticar. Nenhum cadastro ou senha é necessário.",
  },
  {
    icon: FileSignature,
    title: "Crie o certificado",
    description:
      "Preencha os dados ou envie um arquivo. Nosso servidor gera um hash SHA-256 único do conteúdo.",
  },
  {
    icon: Link2,
    title: "Ancore na Solana",
    description:
      "Você assina uma transação que grava o hash on-chain via o Memo Program oficial da Solana.",
  },
  {
    icon: ShieldCheck,
    title: "Compartilhe e verifique",
    description:
      "Receba uma página pública permanente que qualquer pessoa pode usar para validar a autenticidade.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="border-b border-border/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Como funciona"
          title="Da criação à verificação em quatro passos"
          description="Todo o processo acontece em segundos e é 100% auditável na blockchain."
        />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <div key={step.title} className="relative flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl border border-border bg-card">
                  <step.icon className="size-5 text-brand-green" />
                </span>
                <span className="font-mono text-sm text-muted-foreground">
                  0{index + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { Lock, ShieldCheck, Sparkles } from "lucide-react";

import { GitHubIcon, LinkedInIcon } from "@/components/shared/brand-icons";
import { PageHeader } from "@/components/shared/page-header";
import { GITHUB_REPO_URL, LINKEDIN_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça a motivação e os princípios por trás da Solana Proof.",
};

const PRINCIPLES = [
  {
    icon: Lock,
    title: "Privacidade por padrão",
    description:
      "Nunca armazenamos o conteúdo de arquivos ou declarações, apenas o hash criptográfico necessário para prová-los.",
  },
  {
    icon: ShieldCheck,
    title: "Confiança verificável",
    description:
      "Toda prova pode ser auditada de forma independente, sem depender da nossa infraestrutura permanecer no ar.",
  },
  {
    icon: Sparkles,
    title: "Simplicidade acima de tudo",
    description:
      "Usamos o Memo Program nativo da Solana em vez de contratos customizados desnecessariamente complexos.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <PageHeader title="Sobre a Solana Proof" />

      <div className="mt-10 space-y-6 text-muted-foreground">
        <p>
          A Solana Proof nasceu de um problema simples e antigo: como provar que um
          documento, uma declaração ou uma conquista existia em um determinado momento
          no tempo, sem depender de um cartório, uma autoridade central ou a boa vontade
          de terceiros?
        </p>
        <p>
          A resposta moderna para esse problema é a blockchain. Ao registrar a
          impressão digital (hash) de um conteúdo em um livro-razão público,
          descentralizado e imutável, qualquer pessoa pode verificar, para sempre, que
          aquele conteúdo específico existia naquele instante, sem precisar confiar em
          nada além de matemática.
        </p>
        <p>
          Construímos a Solana Proof sobre a rede Solana pela sua combinação de alta
          performance, taxas praticamente nulas e uma comunidade de desenvolvedores
          madura, com bibliotecas oficiais robustas para integração Web3.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {PRINCIPLES.map((principle) => (
          <div key={principle.title} className="rounded-2xl border border-border bg-card/40 p-6">
            <span className="flex size-10 items-center justify-center rounded-lg bg-accent">
              <principle.icon className="size-5" />
            </span>
            <h3 className="mt-4 text-base font-semibold">{principle.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{principle.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-border bg-card/40 p-6">
        <h2 className="text-lg font-semibold">Autor</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Desenvolvido por Eduardo Jeronimo como projeto full stack com integração real
          à blockchain Solana.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:underline"
          >
            <GitHubIcon className="size-4" />
            Ver repositório no GitHub
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:underline"
          >
            <LinkedInIcon className="size-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

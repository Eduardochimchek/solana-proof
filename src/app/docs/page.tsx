import type { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Documentação",
  description: "Entenda a arquitetura e o funcionamento técnico da Solana Proof.",
};

const SECTIONS = [
  {
    id: "visao-geral",
    title: "Visão geral",
    content: (
      <p>
        A Solana Proof permite emitir certificados digitais cuja autenticidade é
        garantida pela blockchain Solana. Cada certificado carrega um hash SHA-256
        único, calculado a partir do seu conteúdo, que é permanentemente ancorado
        on-chain através de uma transação assinada pela carteira do emissor.
      </p>
    ),
  },
  {
    id: "fluxo",
    title: "Fluxo de criação",
    content: (
      <ol className="list-decimal space-y-2 pl-5">
        <li>O usuário conecta uma carteira compatível com o Wallet Standard (ex: Phantom).</li>
        <li>
          Preenche os dados do certificado ou anexa um arquivo. Esses dados são
          enviados ao servidor.
        </li>
        <li>
          O servidor calcula o hash SHA-256 do conteúdo (do arquivo, se enviado, ou de
          uma representação canônica dos campos preenchidos.
        </li>
        <li>
          O servidor monta uma transação não assinada contendo uma instrução do Memo
          Program com o payload <code className="rounded bg-muted px-1 py-0.5 text-xs">solana-proof:v1:&lt;hash&gt;</code>.
        </li>
        <li>
          A carteira do usuário assina e envia a transação. O próprio usuário paga a
          taxa de rede, tornando o processo não-custodial.
        </li>
        <li>
          O servidor busca a transação diretamente na rede Solana para confirmar que
          ela existe, foi bem-sucedida e contém exatamente o hash esperado, antes de
          persistir o certificado.
        </li>
        <li>O usuário recebe uma página pública permanente para compartilhar e provar a autenticidade.</li>
      </ol>
    ),
  },
  {
    id: "memo-program",
    title: "Por que o Memo Program?",
    content: (
      <p>
        Em vez de implantar um programa on-chain customizado, a Solana Proof utiliza o
        Memo Program oficial da Solana
        (<code className="rounded bg-muted px-1 py-0.5 text-xs">MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr</code>).
        Essa é a forma padrão e amplamente utilizada de ancorar dados arbitrários em
        uma transação Solana, permitindo prova de existência (proof-of-existence) sem a
        complexidade e o risco de segurança de um programa próprio.
      </p>
    ),
  },
  {
    id: "privacidade",
    title: "Privacidade e armazenamento",
    content: (
      <p>
        O conteúdo original de arquivos enviados nunca é armazenado. Ele é processado
        em memória apenas para o cálculo do hash e imediatamente descartado. O banco de
        dados guarda somente metadados descritivos (título, descrição, destinatário) e
        a prova criptográfica (hash e assinatura da transação).
      </p>
    ),
  },
  {
    id: "verificacao",
    title: "Verificação pública",
    content: (
      <p>
        Qualquer pessoa pode verificar um certificado através do hash, da assinatura da
        transação ou do link direto da página pública. A verificação consulta o registro
        armazenado e disponibiliza o link direto para a transação no Solana Explorer,
        permitindo auditoria independente a qualquer momento.
      </p>
    ),
  },
  {
    id: "stack",
    title: "Stack tecnológica",
    content: (
      <ul className="list-disc space-y-1 pl-5">
        <li>Next.js (App Router) com TypeScript</li>
        <li>TailwindCSS e shadcn/ui</li>
        <li>Prisma ORM com PostgreSQL (Neon)</li>
        <li>Solana Web3.js e Wallet Adapter</li>
        <li>TanStack Query para gerenciamento de estado assíncrono</li>
      </ul>
    ),
  },
];

export default function DocsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <PageHeader
        title="Documentação"
        description="Como a Solana Proof funciona por baixo dos panos."
      />

      <div className="mt-10 space-y-12">
        {SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground [&_code]:text-foreground [&_li]:text-muted-foreground">
              {section.content}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

<div align="center">

# Solana Proof

**Certificação digital com prova criptográfica permanente na blockchain Solana.**

Emita, ancore e verifique certificados de forma não-custodial, rápida e pública — construído para o desafio Superteam Brasil no TDC Floripa 2026.

[Visão geral](#visão-geral) ·
[Funcionalidades](#funcionalidades) ·
[Arquitetura](#arquitetura) ·
[Stack](#stack-tecnológica) ·
[Instalação](#instalação-e-execução-local) ·
[Solana](#integração-com-a-solana)

</div>

---

## Visão geral

**Solana Proof** é uma plataforma que permite a qualquer pessoa emitir um certificado digital (uma declaração de texto ou um documento) e registrar sua **impressão digital criptográfica** (SHA-256) de forma imutável na blockchain Solana, através do **Memo Program** oficial.

O resultado é uma prova de existência e integridade verificável publicamente por qualquer pessoa, a qualquer momento, sem depender da confiança na plataforma que a emitiu — apenas na blockchain.

### Motivação

Diplomas, declarações, contratos e atestados frequentemente dependem inteiramente da credibilidade de quem os emite. Se o emissor perde os registros, os altera ou deixa de existir, a prova desaparece com ele.

O Solana Proof resolve esse problema com um princípio simples: **o conteúdo nunca sai do controle do usuário, apenas seu hash é ancorado on-chain.** Isso garante:

- **Verificabilidade pública** — qualquer pessoa pode confirmar que um hash específico foi registrado em um momento específico, por uma carteira específica.
- **Privacidade por padrão** — o conteúdo original (texto ou arquivo) nunca é armazenado nos servidores da aplicação, apenas seu hash.
- **Não custodiedade** — o usuário assina e paga a própria transação com sua carteira Phantom; a aplicação nunca tem custódia de fundos ou chaves.
- **Auditabilidade permanente** — o registro vive na blockchain, não em um banco de dados que pode ser apagado ou corrompido.

### Fluxo do produto

1. O usuário acessa a landing page e conecta sua carteira Phantom (Solana Devnet).
2. Preenche um formulário de certificado — uma declaração de texto ou um documento (PDF, imagem etc.).
3. O backend calcula o hash **SHA-256** do conteúdo e monta uma transação Solana com uma instrução do **Memo Program** contendo esse hash.
4. O usuário assina a transação na própria carteira (a aplicação nunca tem acesso à chave privada).
5. O backend confirma a transação on-chain, valida seu conteúdo e persiste os metadados do certificado localmente.
6. O usuário recebe uma página pública de verificação, compartilhável com qualquer pessoa.
7. Qualquer visitante pode verificar a autenticidade por hash, assinatura de transação ou ID do certificado — sem precisar de conta ou carteira.

---

## Funcionalidades

- **Conexão de carteira Phantom** via Solana Wallet Adapter, com estado persistente e feedback visual claro.
- **Criação de certificados** a partir de declarações de texto ou upload de documentos, com validação client e server-side.
- **Hash SHA-256** determinístico calculado no servidor, nunca no cliente, evitando divergências e manipulação.
- **Registro on-chain na Solana Devnet** usando o Memo Program oficial, sem programas customizados ou contratos próprios.
- **Verificação pública** por hash, assinatura de transação ou ID — sem necessidade de autenticação.
- **Verificação real on-chain**: o backend não confia apenas no banco de dados local, ele revalida a transação diretamente na blockchain a cada consulta pública.
- **Dashboard pessoal** com estatísticas e histórico de certificados emitidos pela carteira conectada.
- **Página de certificado compartilhável**, pronta para ser usada como prova pública (ex: em um currículo ou processo seletivo).
- **UI premium em dark mode**, com animações discretas, skeletons de carregamento, estados vazios e tratamento de erros consistente em toda a aplicação.
- **SEO completo**: metadata dinâmica, Open Graph e Twitter Cards gerados via código, sitemap, robots.txt e manifest PWA.

---

## Arquitetura

O projeto segue uma separação estrita de responsabilidades inspirada em princípios de **Clean Architecture** e **SOLID**, adaptada ao modelo de rotas do Next.js App Router.

```
Rota (app/api/**)          →  apenas parsing de entrada e formatação de resposta HTTP
  └─ Service                →  regras de negócio e orquestração (services/**)
       └─ Repository        →  acesso a dados via Prisma (repositories/**)
       └─ Solana Service    →  construção e verificação de transações on-chain (services/**)
  └─ Validator (Zod)        →  validação e tipagem de entrada (validators/**)
```

Nenhuma rota contém regra de negócio: elas apenas validam a entrada, delegam ao serviço apropriado e traduzem o resultado (ou erro) em uma resposta HTTP. Isso torna a lógica de negócio testável de forma isolada e independente do framework HTTP.

### Por que o Memo Program em vez de um programa on-chain próprio?

Escrever e auditar um programa Solana customizado (via Anchor, por exemplo) adiciona superfície de risco significativa — chaves de upgrade, testes de segurança, auditoria de conta — sem agregar valor real ao caso de uso. O **Memo Program** é um programa oficial, mantido pela Solana Labs, extremamente utilizado em produção (exchanges, provedores de identidade, sistemas de anotação) especificamente para anexar dados arbitrários e verificáveis a uma transação. Ele entrega exatamente o que este produto precisa — um registro imutável, público e datado — com o mínimo de superfície de ataque e máxima simplicidade.

### Por que verificação on-chain ativa, e não apenas leitura do banco local?

O endpoint de verificação pública não confia cegamente nos dados salvos no PostgreSQL. Ele recupera a transação diretamente da rede Solana (via RPC) e confirma que:

- a transação foi confirmada com sucesso (sem erros de execução);
- ela contém uma instrução do Memo Program;
- o memo corresponde exatamente ao hash esperado;
- a carteira registrada como emissora é de fato a `fee payer` da transação.

Isso significa que a verdadeira fonte de verdade é a blockchain — o banco de dados local funciona como um índice de conveniência para busca e exibição, não como autoridade.

### Fluxo de assinatura (não-custodial)

```
Cliente                          Servidor                         Solana Devnet
  │                                  │                                  │
  │  1. Envia dados do certificado   │                                  │
  ├─────────────────────────────────>│                                  │
  │                                  │  2. Calcula SHA-256               │
  │                                  │  3. Monta transação com Memo      │
  │                                  │  4. Busca blockhash recente       │
  │  5. Recebe transação (não        │<─────────────────────────────────┤
  │     assinada) serializada        │                                  │
  │<─────────────────────────────────┤                                  │
  │  6. Assina com Phantom           │                                  │
  │  7. Envia transação assinada     │                                  │
  ├──────────────────────────────────┼─────────────────────────────────>│
  │                                  │  8. Confirma assinatura recebida  │
  │  9. Envia assinatura ao servidor │                                  │
  ├─────────────────────────────────>│                                  │
  │                                  │ 10. Revalida transação on-chain   │
  │                                  ├─────────────────────────────────>│
  │                                  │ 11. Persiste certificado          │
  │ 12. Recebe página de verificação │                                  │
  │<─────────────────────────────────┤                                  │
```

A chave privada do usuário nunca trafega para o servidor. O backend apenas monta e revalida transações; quem assina e paga a taxa de rede é sempre o usuário, através da extensão Phantom.

---

## Stack tecnológica

| Categoria | Tecnologia | Motivo |
|---|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) | Rotas de API e páginas no mesmo projeto, React Server Components, SEO nativo |
| Linguagem | TypeScript | Tipagem forte de ponta a ponta, do banco de dados à UI |
| Estilo | Tailwind CSS v4 | Design system utilitário, consistente e performático |
| Componentes | shadcn/ui (Base UI) | Componentes acessíveis, sem *vendor lock-in*, totalmente customizáveis |
| Ícones | Lucide Icons | Biblioteca de ícones consistente e leve |
| ORM | Prisma 7 | Tipagem gerada automaticamente a partir do schema, migrations versionadas |
| Banco de dados | PostgreSQL (Neon) | Serverless, com tier gratuito, mesmo provedor em desenvolvimento e produção |
| Blockchain | [@solana/web3.js](https://solana.com/developers) + Memo Program oficial | Biblioteca oficial da Solana Foundation para construção e envio de transações |
| Carteira | Solana Wallet Adapter (Phantom) | Padrão oficial do ecossistema Solana para integração de carteiras |
| Formulários | React Hook Form + Zod | Validação declarativa, tipada e compartilhada entre client e server |
| Dados assíncronos | TanStack Query | Cache, revalidação e estados de loading/erro consistentes no cliente |
| Notificações | Sonner | Toasts acessíveis e não-intrusivos |

Todas as bibliotecas de blockchain utilizadas (`@solana/web3.js`, `@solana/wallet-adapter-*`) são oficiais e mantidas pela Solana Foundation / Solana Labs.

---

## Estrutura de pastas

```
solana-proof/
├── prisma/
│   ├── schema.prisma          # Modelo de dados (Certificate)
│   └── migrations/            # Histórico de migrations versionadas
├── src/
│   ├── app/                   # Rotas (App Router): páginas + API routes
│   │   ├── api/certificates/  # Endpoints REST (prepare, confirm, verify, list, get)
│   │   ├── certificate/[id]/  # Página pública de verificação de um certificado
│   │   ├── create/            # Criação de certificado
│   │   ├── dashboard/         # Painel do usuário conectado
│   │   ├── history/           # Histórico completo de certificados
│   │   ├── verify/            # Busca pública de verificação
│   │   ├── about/ · docs/     # Páginas institucionais
│   │   └── (arquivos especiais)  # sitemap.ts, robots.ts, manifest.ts, icon.tsx...
│   ├── components/
│   │   ├── certificates/      # Formulário, cartão, listagem e prova de certificado
│   │   ├── dashboard/         # Widgets do painel
│   │   ├── landing/           # Seções da landing page
│   │   ├── layout/            # Navbar, Footer
│   │   ├── providers/         # Providers globais (React Query, Wallet, Tema)
│   │   ├── shared/             # Componentes reutilizáveis (Logo, EmptyState, CopyField...)
│   │   └── ui/                 # Componentes base do shadcn/ui
│   ├── hooks/                  # Hooks de dados (React Query) e mutações
│   ├── lib/                    # Configuração da Solana, hash, formatação, erros, Prisma
│   ├── repositories/           # Acesso a dados (Prisma) isolado da lógica de negócio
│   ├── services/                # Regras de negócio e orquestração (certificado, memo)
│   ├── types/                   # Tipos e DTOs compartilhados
│   └── validators/              # Schemas Zod de entrada
├── .env.example
└── README.md
```

---

## Instalação e execução local

### Pré-requisitos

- [Node.js 20+](https://nodejs.org)
- [pnpm](https://pnpm.io) (`npm install -g pnpm`)
- Um banco [Neon](https://neon.tech) PostgreSQL (tier gratuito) — pode ser criado em segundos, direto pela aba **Storage** de um projeto na Vercel, ou em [neon.tech](https://neon.tech)
- A [extensão Phantom Wallet](https://phantom.app) instalada no navegador, configurada para a rede **Devnet**

### Passo a passo

```bash
# 1. Clonar o repositório
git clone https://github.com/Eduardochimchek/solana-proof.git
cd solana-proof

# 2. Instalar dependências
pnpm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Preencha DATABASE_URL e DATABASE_URL_UNPOOLED com a string de conexão do seu banco Neon.
# Se o projeto já estiver vinculado a um projeto Vercel com Neon conectado, você pode
# obter essas variáveis automaticamente com: npx vercel env pull .env

# 4. Aplicar o schema do banco de dados
pnpm prisma migrate deploy

# 5. Iniciar o servidor de desenvolvimento
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`.

### Obtendo SOL de teste (Devnet)

Como a aplicação opera na **Solana Devnet**, você precisa de SOL de teste (sem valor real) para pagar as taxas de transação:

1. Abra a Phantom Wallet e mude a rede para **Devnet** (Configurações → Developer Settings → Change Network).
2. Copie o endereço da sua carteira.
3. Solicite SOL de teste em um faucet público, por exemplo [faucet.solana.com](https://faucet.solana.com).

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `pnpm dev` | Inicia o servidor de desenvolvimento |
| `pnpm build` | Gera o build de produção |
| `pnpm start` | Inicia o servidor com o build de produção |
| `pnpm lint` | Executa o ESLint |
| `pnpm typecheck` | Verifica os tipos com o TypeScript (sem emitir arquivos) |
| `pnpm prisma studio` | Abre uma interface visual para o banco de dados |
| `pnpm prisma migrate dev` | Cria e aplica uma nova migration a partir de alterações no schema |
| `pnpm prisma migrate deploy` | Aplica migrations pendentes (usado em desenvolvimento e no build de produção) |

---

## Configuração e variáveis de ambiente

Todas as variáveis estão documentadas em [`.env.example`](./.env.example).

| Variável | Obrigatória | Descrição |
|---|---|---|
| `DATABASE_URL` | Sim | String de conexão PostgreSQL pooled (via PgBouncer), usada pela aplicação em runtime. |
| `DATABASE_URL_UNPOOLED` | Sim | String de conexão PostgreSQL direta, usada pelo Prisma Migrate (a pool em modo transaction não suporta os locks que as migrations exigem). |
| `NEXT_PUBLIC_SOLANA_RPC_URL` | Não | Endpoint RPC customizado da Solana Devnet. Se vazio, usa o endpoint público `api.devnet.solana.com`. Recomendado usar um provedor dedicado (Helius, QuickNode) em produção para maior confiabilidade. |
| `NEXT_PUBLIC_APP_URL` | Sim | URL pública da aplicação, usada em metadados de SEO, Open Graph e no sitemap. |

Nenhuma chave privada, seed phrase ou credencial de carteira é solicitada ou armazenada pela aplicação em nenhum momento.

---

## Integração com a Solana

- **Rede:** Solana Devnet (ambiente de testes, sem valor monetário real).
- **Programa utilizado:** [Memo Program](https://spl.solana.com/memo) (`MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr`), mantido pela Solana Labs.
- **Formato do memo:** `solana-proof:v1:<hash-sha256-hex>` — um namespace de versão simples que permite evoluir o formato no futuro sem ambiguidade.
- **Carteira suportada:** Phantom, via [Solana Wallet Adapter](https://github.com/anza-xyz/wallet-adapter) (padrão aberto compatível com qualquer carteira que implemente a especificação).
- **Verificação:** cada consulta pública busca a transação diretamente do RPC da Solana e revalida o conteúdo do memo, o status de confirmação e o autor da transação — o servidor nunca confia apenas no registro local.
- **Exploração:** toda transação e certificado exibem um link direto para o [Solana Explorer](https://explorer.solana.com) na Devnet, permitindo auditoria independente por qualquer pessoa.

---

## Decisões técnicas

- **Next.js App Router com API Routes**, em vez de um backend separado: mantém o projeto coeso, reduz a complexidade de deploy e ainda preserva a separação de camadas (rota → service → repository) dentro do próprio projeto.
- **PostgreSQL (Neon) tanto em desenvolvimento quanto em produção**: a primeira versão do projeto usava SQLite localmente por simplicidade, mas essa abordagem foi abandonada em favor de um único provedor — SQLite não é viável em ambientes serverless (sem sistema de arquivos persistente entre invocações) e manter dois dialetos de banco distintos introduz risco real de divergência entre schema de desenvolvimento e produção. O Neon oferece um tier gratuito com provisionamento em segundos, eliminando o principal argumento a favor do SQLite.
- **Prisma 7 com Driver Adapters** (`@prisma/adapter-neon`, sobre o driver serverless da Neon): abordagem recomendada pela versão mais recente do Prisma, otimizada para ambientes serverless — usa uma conexão pooled (`DATABASE_URL`) para queries da aplicação e uma conexão direta (`DATABASE_URL_UNPOOLED`) para as migrations do Prisma Migrate.
- **Migrations aplicadas automaticamente no build** (`prisma migrate deploy && next build`): garante que o schema de produção esteja sempre sincronizado com o código implantado, sem passos manuais no fluxo de deploy da Vercel.
- **Hash calculado exclusivamente no servidor**: evita que o hash seja manipulado no cliente antes de ser ancorado on-chain, garantindo que o valor registrado corresponda exatamente ao conteúdo enviado.
- **Nenhum conteúdo original é persistido**: apenas metadados (título, descrição, nome do arquivo) e o hash são armazenados — o conteúdo em si nunca é salvo, por design de privacidade.
- **Erros internos nunca vazam para o cliente**: qualquer exceção inesperada é registrada no servidor e retorna uma mensagem genérica ao usuário, evitando exposição de detalhes de implementação.
- **`next/og` para geração de imagens de metadata**: ícones, Open Graph e Twitter Card são gerados via código (`ImageResponse`), garantindo consistência visual com o design system sem depender de arquivos estáticos exportados manualmente.

---

## Segurança e privacidade

- A aplicação é **não-custodial**: nenhuma chave privada ou seed phrase é solicitada, transmitida ou armazenada.
- Toda assinatura de transação ocorre no navegador do usuário, através da extensão Phantom.
- O conteúdo original de declarações e documentos **nunca é persistido** — apenas seu hash SHA-256.
- Toda entrada de API é validada com schemas Zod antes de qualquer processamento.
- Uploads de arquivo possuem limite de tamanho e validação de tipo.
- A verificação pública revalida a transação diretamente na blockchain, em vez de confiar apenas no banco local.

---

## Roadmap / melhorias futuras

- Suporte a múltiplas carteiras além da Phantom (Solflare, Backpack) via Wallet Adapter.
- Emissão de certificados em lote (ex: para instituições de ensino).
- Exportação de certificado em PDF com QR code para verificação.
- Suporte a Mainnet com taxonomia de rede configurável por ambiente.
- Testes automatizados end-to-end (Playwright) cobrindo o fluxo completo de emissão e verificação.
- Internacionalização (i18n) para inglês.

---

## Licença

Distribuído sob a licença MIT. Veja [`LICENSE`](./LICENSE) para mais informações.

---

<div align="center">

Desenvolvido por **Eduardo Jeronimo** para o desafio Superteam Brasil — TDC Floripa 2026.

</div>

# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto segue [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Adicionado

- Landing page com apresentação do produto, fluxo de funcionamento e chamadas para ação.
- Conexão de carteira Phantom via Solana Wallet Adapter.
- Criação de certificados a partir de declarações de texto ou upload de documentos.
- Cálculo de hash SHA-256 no servidor e ancoragem on-chain via Memo Program da Solana (Devnet).
- Fluxo completo de assinatura não-custodial (preparo → assinatura no cliente → confirmação).
- Verificação pública de certificados por hash, assinatura de transação ou ID, com revalidação direta na blockchain.
- Dashboard com estatísticas e histórico de certificados da carteira conectada.
- Página pública e compartilhável de comprovação de certificado.
- Páginas institucionais: Sobre e Documentação.
- Estados de carregamento (skeletons), estados vazios, *error boundaries* e notificações (toasts) em toda a aplicação.
- SEO completo: metadata dinâmica, Open Graph, Twitter Card, sitemap, robots.txt e manifest PWA gerados via código.
- Persistência local com Prisma (SQLite em desenvolvimento).

[Unreleased]: https://github.com/eduardojeronimo/solana-proof/commits/main

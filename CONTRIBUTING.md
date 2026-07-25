# Contribuindo com o Solana Proof

Obrigado pelo interesse em contribuir! Este documento descreve como configurar o ambiente, os padrões de código e o processo esperado para propor mudanças.

## Configurando o ambiente

Siga as instruções da seção [Instalação e execução local](./README.md#instalação-e-execução-local) do README.

## Padrões de código

- **TypeScript estrito** — evite `any`; prefira tipos explícitos e inferência quando possível.
- **Separação de camadas** — regras de negócio pertencem a `services/`, acesso a dados a `repositories/`, validação de entrada a `validators/`. Rotas de API (`app/api/**`) devem apenas orquestrar essas camadas.
- **Componentes reutilizáveis** ficam em `components/shared/`; componentes específicos de um domínio ficam na pasta correspondente (`components/certificates/`, `components/dashboard/` etc.).
- **Nomes claros e descritivos** — evite abreviações ambíguas.
- **Sem comentários óbvios** — comente apenas decisões não triviais, não o que o código já expressa por si.
- Rode `pnpm lint` e `pnpm typecheck` antes de abrir um Pull Request.

## Commits

Utilizamos mensagens de commit no formato [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adiciona suporte a múltiplas carteiras
fix: corrige validação de tamanho de arquivo
refactor: extrai lógica de hash para lib compartilhada
docs: atualiza instruções de instalação
style: ajusta espaçamento no formulário de criação
chore: atualiza dependências
```

- Cada commit deve representar uma mudança coerente e funcional.
- Evite commits genéricos como `wip` ou `fix stuff`.
- Nunca faça commit de código quebrado (`pnpm build` deve passar).

## Pull Requests

1. Crie uma branch a partir de `main`: `git checkout -b feat/nome-da-feature`.
2. Garanta que `pnpm lint`, `pnpm typecheck` e `pnpm build` executam sem erros.
3. Descreva claramente o que foi alterado e por quê.
4. Inclua screenshots para mudanças visuais, quando aplicável.

## Reportando bugs

Abra uma issue descrevendo:

- Passos para reproduzir o problema.
- Comportamento esperado vs. comportamento observado.
- Ambiente (sistema operacional, navegador, versão do Node).

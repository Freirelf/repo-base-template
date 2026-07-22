# AGENTS.md

Este arquivo é o ponto de entrada para agentes de IA (Claude Code, Cursor, Copilot etc.)
trabalharem neste repositório de forma autônoma. Leia isto antes de qualquer mudança.

## Descrição do projeto

[PREENCHER: o que este projeto faz, para quem, e qual problema resolve. 2-4 frases.]

## Stack

- Linguagem/runtime: Node.js + TypeScript
- Gerenciador de pacotes: pnpm
- Lint/format: ESLint + Prettier
- Testes: [PREENCHER: Vitest, Jest, etc.]
- [PREENCHER: framework web/API, banco de dados, filas, outras dependências relevantes]

## Comandos essenciais

```bash
pnpm install       # instalar dependências
pnpm dev           # rodar em desenvolvimento
pnpm test          # rodar testes
pnpm build         # gerar build de produção
pnpm lint          # checar lint
pnpm format        # aplicar formatação
```

[PREENCHER: ajuste os comandos acima conforme o package.json real do projeto.]

## Arquitetura resumida

O código em `src/` segue inversão de dependência (ver [docs/architecture.md](docs/architecture.md)):

- `domain/` — regras de negócio puras. Não importa nada de `infrastructure/` ou `interface/`.
  Define as interfaces (portas) que o mundo externo precisa implementar.
- `application/` — casos de uso que orquestram o domínio. Depende de `domain/`, nunca o contrário.
- `infrastructure/` — implementações concretas (adapters) das portas do domínio: banco de dados,
  APIs externas, filas, filesystem etc.
- `interface/` — pontos de entrada (HTTP, CLI, workers, GraphQL) que traduzem requisições
  externas em chamadas para `application/`.

## Convenções de código

- [PREENCHER: convenção de nomes de arquivos/pastas]
- [PREENCHER: estilo de exports (nomeados vs default)]
- [PREENCHER: como tratar erros — exceptions, Result type, etc.]
- Commits seguem Conventional Commits (ver [CONTRIBUTING.md](CONTRIBUTING.md))
- Mudança de arquitetura relevante deve gerar um ADR em `docs/decisions/`

## O que a IA nunca deve fazer sem perguntar

- Alterar ou remover migrations de banco de dados já aplicadas
- Fazer force-push ou reescrever histórico de branches compartilhadas
- Adicionar, remover ou fazer upgrade/downgrade de dependências de produção
- Alterar pipelines de CI/CD (`.github/workflows/`)
- Expor segredos, chaves ou credenciais em código, logs ou commits
- Fazer deploy ou publicar pacotes
- [PREENCHER: outras restrições específicas deste projeto]

## Como validar que uma mudança está correta

1. `pnpm lint` sem erros
2. `pnpm test` (unit + integration) passando
3. `pnpm build` completando sem erros
4. [PREENCHER: critérios específicos — cobertura mínima, testes e2e, revisão manual de UI, etc.]

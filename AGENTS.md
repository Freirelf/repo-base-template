# AGENTS.md

Instruções para o agente de IA (Claude Code) trabalhar neste repositório com autonomia e
verificar o próprio trabalho. O [CLAUDE.md](CLAUDE.md) importa este arquivo.

## Descrição do projeto

[PREENCHER: o que este projeto faz, para quem, e qual problema resolve. 2-4 frases.]

## Stack

- Linguagem/runtime: Node.js 24 (`.nvmrc`) + TypeScript
- Gerenciador de pacotes: pnpm (versão fixada em `packageManager` no `package.json`)
- Lint/format: ESLint + Prettier
- Testes: Vitest
- [PREENCHER: framework web/API, banco de dados, filas, outras dependências relevantes]

## Comandos essenciais

```bash
pnpm install        # instalar dependências
pnpm dev            # rodar em desenvolvimento
pnpm check          # verificação completa (o mesmo comando do CI)
pnpm test           # só os testes (Vitest; aceita um arquivo: pnpm test tests/unit/x.test.ts)
pnpm typecheck      # type-check de src/ e tests/ (tsconfig.json)
pnpm lint           # ESLint, inclusive a regra de camadas
pnpm format         # aplica Prettier
pnpm format:check   # checa formatação sem alterar
pnpm build          # build de produção (tsconfig.build.json → dist/)
```

## Arquitetura resumida

O código em `src/` segue inversão de dependência (ver [docs/architecture.md](docs/architecture.md)):

- `domain/` — regras de negócio puras. Não importa nada de `application/`, `infrastructure/`
  ou `interface/` (o ESLint barra). Define as interfaces (portas) que o mundo externo implementa.
- `application/` — casos de uso que orquestram o domínio. Depende de `domain/`, nunca o contrário.
- `infrastructure/` — implementações concretas (adapters) das portas do domínio: banco de dados,
  APIs externas, filas, filesystem etc.
- `interface/` — pontos de entrada (HTTP, CLI, workers, GraphQL) que traduzem requisições
  externas em chamadas para `application/`.

Testes ficam em `tests/unit/`, `tests/integration/` e `tests/e2e/`, como `*.test.ts`.

## Convenções de código

- [PREENCHER: convenção de nomes de arquivos/pastas]
- [PREENCHER: estilo de exports (nomeados vs default)]
- [PREENCHER: como tratar erros — exceptions, Result type, etc.]
- Imports relativos com extensão `.js` (ESM com `moduleResolution: NodeNext`)
- Commits seguem Conventional Commits (ver [CONTRIBUTING.md](CONTRIBUTING.md)), um por item lógico
- Mudança de arquitetura relevante deve gerar um ADR em `docs/decisions/`

## Fluxo de trabalho

1. **Tarefa trivial** (typo, ajuste pontual, mudança de poucas linhas sem decisão de design):
   implemente direto e rode `pnpm check`.
2. **Tarefa não trivial**: escreva uma spec em `docs/specs/` seguindo o formato de
   [docs/specs/README.md](docs/specs/README.md) e pare para aprovação.
3. Só implemente depois da aprovação explícita. Se a spec tiver etapas, faça uma por vez.
4. Ao terminar, rode `pnpm check` e confira cada critério de aceite da spec.

**Pronto** significa: `pnpm check` passando **e** todos os critérios de aceite da spec
atendidos e mostrados. Se algo não puder ser verificado, diga o que ficou de fora.

## O que a IA nunca deve fazer sem perguntar

- Alterar ou remover migrations de banco de dados já aplicadas
- Fazer force-push ou reescrever histórico de branches compartilhadas
- Adicionar, remover ou fazer upgrade/downgrade de dependências (produção ou dev)
- Alterar pipelines de CI/CD (`.github/workflows/`)
- Expor segredos, chaves ou credenciais em código, logs ou commits
- Fazer deploy ou publicar pacotes
- [PREENCHER: outras restrições específicas deste projeto]

Parte disso também é imposta por permissões em [.claude/settings.json](.claude/settings.json).

## Recursos de IA do repositório

[docs/ai/README.md](docs/ai/README.md) explica o que existe em `.claude/` (rules, skills,
subagents, hooks), MCP, code intelligence e o plugin pessoal, e quando criar cada um.

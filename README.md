# Template Base de Repositório

Este repositório é um **template organizacional**, não um projeto com lógica de negócio.
Ele existe para ser copiado como ponto de partida de novos projetos desenvolvidos com o
Claude Code, já trazendo estrutura de pastas, convenções de código, verificação automática e
contexto pronto para o agente trabalhar com autonomia e verificar o próprio trabalho.

## O que este template resolve

- Evita recriar do zero a mesma estrutura de pastas, CI e documentação em cada projeto novo.
- Define, desde o início, convenções de arquitetura (inversão de dependência) e de processo
  (Conventional Commits, ADRs, specs, PRs pequenos).
- Um único comando de verificação, `pnpm check` (formatação, lint com regra de camadas,
  type-check, testes e build), igual no local e no CI.
- Fornece [AGENTS.md](AGENTS.md) (importado pelo [CLAUDE.md](CLAUDE.md)) e `.claude/` com
  permissões, para o agente entender o projeto e saber o que exige confirmação humana.

## Como usar

1. Clone ou use este repositório como template para o novo projeto.
2. Preencha os campos marcados com `[PREENCHER: ...]` em [AGENTS.md](AGENTS.md), começando
   pela descrição do projeto e pela stack.
3. Rode `pnpm install` e `pnpm check`. O CI (`.github/workflows/ci.yml`) roda o mesmo
   `pnpm check`; ajuste `.github/workflows/release.yml` com o passo de publicação.
4. Copie `.env.example` para `.env` (e `.mcp.json.example` para `.mcp.json`, se usar MCP) e
   preencha os valores locais.
5. Leia [docs/ai/README.md](docs/ai/README.md) para saber quando criar rules, skills,
   subagents e hooks.
6. Remova este README genérico e escreva a documentação real do produto.

## Estrutura de pastas

```
.
├── AGENTS.md            # contexto para o agente: stack, comandos, fluxo, restrições
├── CLAUDE.md            # importa o AGENTS.md (@AGENTS.md)
├── .claude/
│   ├── settings.json    # permissões do projeto
│   ├── rules/           # instruções modulares (python.md só carrega em arquivos .py)
│   ├── skills/          # skills específicas do projeto
│   ├── agents/          # subagents específicos do projeto
│   └── hooks/           # scripts de hooks específicos do projeto
├── .mcp.json.example    # modelo de servidores MCP (nada ativo)
├── docs/
│   ├── ai/              # guia dos recursos de IA: quando criar e quando não criar
│   ├── specs/           # specs de tarefas não triviais (formato no README)
│   ├── decisions/       # ADRs
│   ├── architecture.md  # princípios de arquitetura
│   └── runbook.md       # operação
├── src/
│   ├── domain/          # regras de negócio puras, sem dependências externas
│   ├── application/     # casos de uso, orquestra o domínio
│   ├── infrastructure/  # adapters concretos (banco, APIs, filas)
│   └── interface/       # entradas externas (HTTP, CLI, workers)
├── tests/
│   ├── unit/            # testes de unidades isoladas
│   ├── integration/     # testes entre componentes internos
│   └── e2e/             # testes de ponta a ponta
├── scripts/             # scripts utilitários de automação
├── config/              # arquivos de configuração por ambiente
├── tsconfig.json        # type-check de src/ e tests/ (usado pelo editor e pelo typecheck)
└── tsconfig.build.json  # build de produção (só src/ → dist/)
```

Cada pasta vazia fora de `.claude/` tem um `README.md` explicando sua responsabilidade. Em
`.claude/` as pastas vazias têm só `.gitkeep` (o Claude Code lê `.md` ali como instrução);
o uso delas está em [docs/ai/README.md](docs/ai/README.md).

## Saiba mais

- [AGENTS.md](AGENTS.md) — como o agente deve trabalhar neste repositório
- [docs/ai/README.md](docs/ai/README.md) — recursos de IA e quando usar cada um
- [docs/specs/README.md](docs/specs/README.md) — formato de spec
- [docs/architecture.md](docs/architecture.md) — princípios de arquitetura
- [CONTRIBUTING.md](CONTRIBUTING.md) — fluxo de contribuição

# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere a [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Added

- Estrutura inicial do template (pastas, CI, documentação base).
- Script `pnpm check` (format:check, lint, typecheck, test, build), usado também no CI.
- Script `typecheck` cobrindo `src/` e `tests/`; build separado em `tsconfig.build.json`.
- Script `format:check` e `.prettierignore`.
- Regra de camadas no ESLint: `src/domain/` não pode importar `application/`,
  `infrastructure/` nem `interface/`.
- `packageManager` (pnpm 12.3.4) e `.nvmrc` (Node 24) para alinhar local e CI.
- `CLAUDE.md` importando `AGENTS.md`.
- `.claude/settings.json` com permissões do projeto; pastas `.claude/skills/`,
  `.claude/agents/` e `.claude/hooks/`; rule `.claude/rules/python.md`.
- `.mcp.json.example` como modelo de servidores MCP.
- Guia de recursos de IA em `docs/ai/README.md`.
- Formato de spec em `docs/specs/README.md` e a spec 0001.

### Changed

- AGENTS.md reescrito para o Claude Code, com fluxo spec → aprovação → implementação →
  `pnpm check`.
- CI roda `pnpm check`; `pnpm/action-setup` atualizado para v6.
- CONTRIBUTING.md e template de PR usam `pnpm check`.
- `.gitignore` ignora `CLAUDE.local.md` e `.claude/settings.local.json`.

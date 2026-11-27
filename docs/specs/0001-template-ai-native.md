# 0001 — Template AI-native (etapas 1 e 2)

- Status: concluída (etapas 1 e 2; `/context all` conferido numa sessão nova)
- Escopo: este repositório (repo-base-template). Plugin e template Python têm specs próprias
  (ver final).

## Contexto

Este template vai virar a base dos meus projetos desenvolvidos com Claude Code (uso pessoal,
só Claude Code). A ideia é o agente conseguir trabalhar com autonomia e verificar o próprio
trabalho. A estrutura deve ser completa como mapa: recursos que nem todo projeto usa existem
como pasta vazia + explicação de quando usar.

### Achados da análise do repo (confirme antes de agir)

- `pnpm install`, `lint`, `test` e `build` passam.
- Não existe CLAUDE.md nem `.claude/`.
- `tsconfig.json` exclui `tests/` e o Vitest não checa tipos: testes nunca passam por
  type-check.
- Não há verificação de formatação; `prettier --check` falha em CHANGELOG.md,
  CONTRIBUTING.md e pnpm-lock.yaml.
- A regra "domain/ não importa infrastructure/ nem interface/" só está documentada, nada a
  impede.
- AGENTS.md cita Cursor/Copilot e tem `[PREENCHER]` que o template já resolve (ex.: Vitest,
  pnpm).
- `.gitignore` não inclui `CLAUDE.local.md` nem `.claude/settings.local.json`.

## Princípios

- Regra que precisa valer sempre vira mecanismo (lint, script, CI, permissão), não
  instrução.
- AGENTS.md/CLAUDE.md abaixo de 200 linhas.
- Local e CI rodam exatamente o mesmo comando de verificação.
- Não mudar a arquitetura de camadas nem o processo (Conventional Commits, ADRs,
  trunk-based).

## Etapa 1 — Verificação

1. Script `typecheck` cobrindo `src/` e `tests/` (tsconfig de checagem separado do de
   build).
2. Script `format:check` + `.prettierignore` (incluindo `pnpm-lock.yaml`); corrigir a
   formatação de CHANGELOG.md e CONTRIBUTING.md.
3. Regra de camadas no ESLint: `domain/` importando `infrastructure/` ou `interface/` deve
   falhar. Preferir `no-restricted-imports` (sem dependência nova); se não for suficiente,
   proponha alternativa e pergunte antes de adicionar dependência.
4. Script `check` rodando em sequência: format:check, lint, typecheck, test, build.
5. CI (`.github/workflows/ci.yml`) rodando `pnpm check`.
6. Atualizar CONTRIBUTING.md e o template de PR para usar `pnpm check`.

Critério de aceite:

- `pnpm check` passa limpo.
- `pnpm check` falha ao adicionar temporariamente (e depois remover) um teste com erro de
  tipo e um import proibido em `src/domain/`. Mostre as duas falhas.

## Etapa 2 — Contexto e estrutura para IA

1. Reescrever AGENTS.md: remover menções a Cursor/Copilot, resolver os `[PREENCHER]` que o
   template já define, validação = `pnpm check`, incluir o fluxo de trabalho: tarefa não
   trivial → spec em `docs/specs/` → minha aprovação → implementação → `pnpm check`.
   "Pronto" = `pnpm check` passando + critérios de aceite da spec atendidos. Manter a seção
   "o que a IA nunca deve fazer sem perguntar".
2. CLAUDE.md contendo `@AGENTS.md` (instruções só do Claude abaixo do import, se houver).
3. `.claude/settings.json` com permissões do projeto: liberar leitura e os scripts de
   verificação; exigir confirmação para mudança de dependências e de `.github/workflows/`.
4. Pastas com `.gitkeep`: `.claude/skills/`, `.claude/agents/`, `.claude/hooks/` (scripts de
   hooks específicos do projeto). NÃO colocar README dentro de `.claude/`: `rules/` carrega
   todo `.md` recursivamente.
5. `.claude/rules/python.md` com frontmatter `paths` para `**/*.py`: convenções Python (uv,
   Ruff, pytest, type hints, mesma arquitetura de camadas). Só carrega quando houver arquivo
   Python, então não custa nada em projetos TS.
6. `.mcp.json.example` (modelo, nada ativo), no mesmo espírito do `.env.example`.
7. `docs/ai/README.md`: guia com uma seção por recurso (CLAUDE.md, rules, skills,
   subagents, hooks, MCP, code intelligence/LSP, plugin) respondendo: o que é, quando
   criar, quando NÃO criar. Incluir:
   - Plugin pessoal: instalado em escopo de usuário, fornece os hooks de segurança
     (.env/segredos, comandos destrutivos, lint após edição) e as skills /plan, /review e
     /release. O que serve a todos os projetos vai no plugin, não no template.
   - Code intelligence (LSP): quando ativar e quais plugins usar para TS e Python (verifique
     os nomes no marketplace oficial antes de escrever).
   - Python: como usar a rule `python.md` e que há um template Python dedicado.
8. `docs/specs/README.md`: formato de uma spec (contexto, decisão, tarefas, critérios de
   aceite). Mover esta spec para `docs/specs/` como primeiro exemplo.
9. `.gitignore`: adicionar `CLAUDE.local.md` e `.claude/settings.local.json`.
10. Atualizar README.md (estrutura de pastas) e CHANGELOG.md.

Critério de aceite:

- Numa sessão nova, `/context all` lista o CLAUDE.md e o AGENTS.md importado.
- `pnpm check` continua passando.

## Verifique a documentação antes de escrever arquivos de configuração

Formatos mudam com frequência. Confirme na doc atual antes de propor:

- <https://code.claude.com/docs/en/memory> (CLAUDE.md, imports, AGENTS.md, rules)
- <https://code.claude.com/docs/en/features-overview>
- Páginas de settings/permissões e de skills/subagents a partir delas. Se algo nesta spec
  conflitar com a documentação, aponte antes de seguir.

## Próximas specs (outros repositórios)

Estes itens fazem parte do padrão, mas são construídos fora deste repo. Este template apenas
os referencia (guia em `docs/ai/README.md`, rule de Python, pastas):

- 0002 — Plugin pessoal (repo próprio): hooks e skills /plan, /review, /release.
- 0003 — Template Python (repo próprio), replicando esta estrutura.
- 0004 — Ativação de code intelligence (LSP) após validar os plugins oficiais.

## Como executar

- Uma etapa por vez. Planeje a etapa, espere minha aprovação, implemente, mostre a
  verificação e pare.
- Commits pequenos em Conventional Commits, um por item lógico.
- Sem dependência nova sem perguntar.

## Notas de implementação

Registro do que a documentação do Claude Code (consultada em 2026-11-27) ajustou em relação
ao texto acima:

- **Etapa 1:** a regra de camadas também barra `domain/` → `application/` (já documentado
  em `docs/architecture.md`). Versões alinhadas entre local e CI: `packageManager`
  `pnpm@12.3.4`, `.nvmrc` com Node 24 e `pnpm/action-setup@v6`.
- **Leitura** já é liberada por padrão dentro do projeto; `settings.json` não precisa de
  regra para isso.
- **Rule com `paths`** carrega quando o Claude lê ou edita um arquivo que casa com o glob,
  não pela simples existência do arquivo.
- **Dependências:** `ask` vence `allow` e `Bash(pnpm install *)` também casaria com o
  `pnpm install` sem argumentos. Por isso o `settings.json` pede confirmação em `add`,
  `remove`, `update` e variantes, e em edições de `package.json`/lockfile; o caso
  `pnpm install <pacote>` fica coberto só pela instrução no AGENTS.md.
- **Skills de plugin** ganham o prefixo do plugin: `/<plugin>:plan`, `/<plugin>:review`,
  `/<plugin>:release`.

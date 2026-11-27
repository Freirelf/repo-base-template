# Recursos de IA (Claude Code)

Guia dos recursos do Claude Code que este template prevê: o que cada um é, quando criar e
quando **não** criar. As pastas existem vazias de propósito; crie conteúdo só quando houver
necessidade real.

Regra geral: **o que precisa valer sempre vira mecanismo** (lint, script, CI, permissão,
hook), não instrução em texto. Instrução é pedido; mecanismo é garantia.

Referência oficial: <https://code.claude.com/docs/en/features-overview>.

## Custo de contexto

| Recurso           | Quando carrega                            | Custo                                      |
| ----------------- | ----------------------------------------- | ------------------------------------------ |
| CLAUDE.md         | Início da sessão                          | Toda requisição                            |
| Rules sem `paths` | Início da sessão                          | Toda requisição                            |
| Rules com `paths` | Ao ler/editar arquivo que casa com o glob | Só quando relevante                        |
| Skills            | Descrição no início; corpo quando usada   | Baixo (descrições em toda requisição)      |
| Subagents         | Quando acionado                           | Contexto isolado da sessão principal       |
| Hooks             | No evento                                 | Zero, a menos que devolvam saída           |
| MCP               | Início da sessão                          | Nomes das ferramentas; schemas sob demanda |
| Code intelligence | Após edições, sob demanda                 | Baixo                                      |

## CLAUDE.md e AGENTS.md

**O que é.** Instruções carregadas em toda sessão. Aqui, [CLAUDE.md](../../CLAUDE.md) só
contém `@AGENTS.md`, e o conteúdo real fica em [AGENTS.md](../../AGENTS.md). O Claude Code
só lê o AGENTS.md sozinho quando não existe CLAUDE.md; como existe, o import é necessário.

**Quando criar/editar.** Fatos que o agente precisa em quase toda tarefa: stack, comandos,
arquitetura, fluxo de trabalho, o que exige confirmação. Instruções que só servem ao Claude
(e não a outra ferramenta que leia AGENTS.md) vão no CLAUDE.md, abaixo do import.
Preferências pessoais que não devem ir para o git vão em `CLAUDE.local.md` (ignorado).

**Quando NÃO criar.** Conteúdo de referência longo ou específico de uma área (vira rule com
`paths` ou skill). Regras que precisam valer sempre (viram mecanismo). Manter
CLAUDE.md + AGENTS.md abaixo de 200 linhas: import não reduz custo, o arquivo importado
entra inteiro.

Para conferir o que carregou: `/context all` numa sessão, lista **Memory files**.

## Rules (`.claude/rules/`)

**O que é.** Arquivos `.md` com instruções modulares. Todo `.md` em `.claude/rules/` é lido
**recursivamente** (por isso não há README dentro de `.claude/`). Sem frontmatter, carrega
no início como o CLAUDE.md. Com `paths`, só carrega quando o Claude lê ou edita um arquivo
que casa com o glob:

```markdown
---
paths:
  - "src/api/**/*.ts"
---
```

**Quando criar.** Convenções de uma linguagem, pasta ou tipo de arquivo que não interessam
ao resto do projeto. Exemplo: [python.md](../../.claude/rules/python.md), com
`paths: ["**/*.py"]`.

**Quando NÃO criar.** Rule sem `paths` com conteúdo que caberia no AGENTS.md (só fragmenta).
Procedimentos passo a passo que o agente executa sob demanda (isso é skill).

## Skills (`.claude/skills/`)

**O que é.** Um procedimento reutilizável em `.claude/skills/<nome>/SKILL.md`, com
frontmatter (`description` recomendado; `name` padrão é o nome da pasta). Vira `/<nome>` e
o Claude também pode acioná-la sozinho pela descrição (desligue com
`disable-model-invocation: true`). Pode ter arquivos de apoio na mesma pasta.
`.claude/commands/` foi incorporado às skills; prefira skills.

**Quando criar.** Fluxo repetido **específico deste projeto**: gerar uma migration no padrão
do projeto, rodar um seed, preparar um ambiente local complexo.

**Quando NÃO criar.** Fluxos que servem a todos os projetos (planejar, revisar, release):
vão no plugin pessoal. Conhecimento que o agente precisa sempre (vai no AGENTS.md).

## Subagents (`.claude/agents/`)

**O que é.** Agentes especializados em `.claude/agents/<nome>.md`, com frontmatter `name` e
`description` obrigatórios e, opcionalmente, `tools`, `model` etc. Rodam em contexto
isolado e devolvem só o resultado. A pasta é lida recursivamente.

**Quando criar.** Tarefa deste projeto que gera muito ruído de contexto ou precisa de
ferramentas restritas: um revisor que só lê, um investigador de logs de um sistema
específico.

**Quando NÃO criar.** Para tarefas genéricas (os subagents nativos Explore, Plan e
general-purpose já cobrem). Para algo que serve a todos os projetos (vai no plugin).

## Hooks (`.claude/hooks/`)

**O que é.** Comandos que o Claude Code executa em eventos (`PreToolUse`, `PostToolUse`,
`SessionStart`, `Stop` etc.). A configuração fica na chave `hooks` do
`.claude/settings.json`; os scripts ficam em `.claude/hooks/` e são referenciados como
`${CLAUDE_PROJECT_DIR}/.claude/hooks/<script>` (precisam de `chmod +x`). Exit code `2`
bloqueia a ação e devolve o stderr ao Claude.

**Quando criar.** Garantia **específica deste projeto** que não cabe em lint/CI: bloquear
edição de um diretório gerado, rodar um gerador de código após editar um schema.

**Quando NÃO criar.** Proteções gerais (segredos, comandos destrutivos, lint após edição):
já vêm do plugin pessoal. Algo que o `pnpm check` ou uma permissão já resolve.

## MCP (`.mcp.json`)

**O que é.** Servidores que dão ao Claude ferramentas externas (APIs, bancos, serviços).
[.mcp.json.example](../../.mcp.json.example) é só modelo, no espírito do `.env.example`:
copie para `.mcp.json` e ajuste. Aceita `${VAR}` e `${VAR:-padrão}`; segredo vem de variável
de ambiente, nunca escrito no arquivo. Na primeira vez, o Claude Code pede aprovação para
usar servidores do `.mcp.json` do projeto.

**Quando criar.** O projeto depende de um sistema externo que o agente precisa consultar
para trabalhar (o banco de dev, o tracker do projeto, a API de um fornecedor).

**Quando NÃO criar.** Quando um CLI resolve (`gh`, `psql`): o Bash já basta e custa menos
contexto. Ferramentas que você usa em todo projeto: configure em escopo de usuário.

## Code intelligence (LSP)

**O que é.** Plugins que ligam um language server ao Claude Code: diagnósticos após cada
edição, ir para definição, achar referências. O plugin não traz o binário; instale-o antes.

| Linguagem             | Plugin           | Binário                      | Instalar o binário                                     |
| --------------------- | ---------------- | ---------------------------- | ------------------------------------------------------ |
| TypeScript/JavaScript | `typescript-lsp` | `typescript-language-server` | `npm install -g typescript-language-server typescript` |
| Python                | `pyright-lsp`    | `pyright-langserver`         | `npm install -g pyright` (ou `pipx install pyright`)   |

```text
/plugin install typescript-lsp@claude-plugins-official
/plugin install pyright-lsp@claude-plugins-official
```

**Quando ativar.** Projetos com base de código média ou grande, refatorações que cruzam
arquivos, ou quando erros de tipo só aparecem tarde (no `pnpm check`). Instale em escopo de
usuário para valer em todos os projetos. Se der `Executable not found in $PATH`, o binário
não está instalado (veja a aba Errors em `/plugin`). Não roda em sessões na nuvem.

**Quando NÃO ativar.** Projetos pequenos em que o `pnpm typecheck` já dá retorno rápido.
A ativação padrão é tema da spec 0004.

## Plugin pessoal

**O que é.** Um plugin instalado em **escopo de usuário**, mantido em repositório próprio
(spec 0002). Fornece:

- **Hooks de segurança**: bloquear leitura/escrita de `.env` e segredos, barrar comandos
  destrutivos, rodar lint após edição.
- **Skills** `plan`, `review` e `release`. Skills de plugin ganham o nome do plugin como
  prefixo: são invocadas como `/<plugin>:plan`, `/<plugin>:review`, `/<plugin>:release`.

**Regra.** O que serve a todos os projetos vai no plugin, não no template. O template só
guarda o que é do projeto: comandos, arquitetura, permissões, rules e skills específicas.

## Python

A rule [`.claude/rules/python.md`](../../.claude/rules/python.md) traz as convenções Python
(uv, Ruff, pytest, type hints, mesmas camadas). Ela só entra no contexto quando o Claude
toca um arquivo `.py`, então não custa nada em projeto TypeScript. Projeto Python novo
deve partir do template Python dedicado (spec 0003), que replica esta estrutura.

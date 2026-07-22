# Contribuindo

## Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/pt-br/):

```
<tipo>(<escopo opcional>): <descrição curta>
```

Tipos comuns: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `ci`.

Exemplos:
```
feat(auth): adiciona login via magic link
fix(orders): corrige cálculo de frete para múltiplos itens
docs: atualiza AGENTS.md com novos comandos de build
```

## Fluxo de branches

- Trabalhamos em **trunk-based development**: uma branch principal (`main`) sempre estável.
- Crie branches de vida curta a partir de `main`: `feat/nome-curto`, `fix/nome-curto`.
- Abra **Pull Requests pequenos e focados** — prefira várias PRs pequenas a uma PR grande.
  PRs grandes demoram mais para revisar e escondem regressões.
- Faça merge assim que a PR passar CI e revisão; evite branches de longa duração.

## Decisões de arquitetura (ADRs)

Toda mudança que afete a arquitetura do projeto — nova dependência estrutural, mudança de
padrão entre camadas (`domain`/`application`/`infrastructure`/`interface`), troca de
tecnologia de persistência, etc. — deve ser registrada como um ADR (Architecture Decision
Record) em `docs/decisions/`.

- Use o formato do exemplo em [docs/decisions/0001-registro-de-decisoes.md](docs/decisions/0001-registro-de-decisoes.md).
- Nomeie o arquivo como `NNNN-titulo-curto.md`, incrementando o número sequencialmente.
- Um ADR não precisa ser longo — o objetivo é registrar o "porquê", não repetir o código.

## Checklist antes de abrir uma PR

- [ ] `pnpm lint` sem erros
- [ ] `pnpm test` passando
- [ ] `pnpm build` completando sem erros
- [ ] ADR criado, se a mudança afeta arquitetura
- [ ] Descrição da PR preenchida usando o template

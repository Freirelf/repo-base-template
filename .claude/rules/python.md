---
paths:
  - "**/*.py"
---

# Convenções Python

Vale para qualquer arquivo `.py` deste repositório. Projetos Python novos devem partir do
template Python dedicado, que já traz estas ferramentas configuradas.

- **Ambiente e dependências**: uv (`uv sync`, `uv add`, `uv run`). Não use `pip install`
  direto nem crie virtualenv à mão. Adicionar ou remover dependência exige perguntar antes.
- **Lint e formatação**: Ruff (`uv run ruff check` e `uv run ruff format`).
- **Testes**: pytest (`uv run pytest`), em `tests/unit/`, `tests/integration/` e `tests/e2e/`,
  arquivos `test_*.py`.
- **Tipos**: type hints em toda função e método públicos; evite `Any` sem justificativa.
- **Arquitetura**: as mesmas camadas de `docs/architecture.md` (`domain/`, `application/`,
  `infrastructure/`, `interface/`). `domain/` não importa das outras três; portas são
  `Protocol` ou classes abstratas definidas em `domain/`.
- **Verificação**: o projeto Python expõe um único comando de verificação (equivalente ao
  `pnpm check`) que roda formatação, lint, tipos e testes; use-o antes de dar a tarefa por
  pronta.

# Template Base de Repositório

Este repositório é um **template organizacional**, não um projeto com lógica de negócio.
Ele existe para ser copiado como ponto de partida de novos projetos, já trazendo estrutura
de pastas, convenções de código e contexto pronto para colaboração entre humanos e agentes
de IA (Claude Code, Cursor, Copilot).

## O que este template resolve

- Evita recriar do zero a mesma estrutura de pastas, CI e documentação em cada projeto novo.
- Define, desde o início, convenções de arquitetura (inversão de dependência) e de processo
  (Conventional Commits, ADRs, PRs pequenos).
- Fornece um [AGENTS.md](AGENTS.md) pronto para agentes de IA entenderem o projeto rapidamente
  e saberem quais ações exigem confirmação humana.

## Como usar

1. Clone ou use este repositório como template para o novo projeto.
2. Preencha os campos marcados com `[PREENCHER: ...]` em [AGENTS.md](AGENTS.md), começando
   pela descrição do projeto e pela stack.
3. Ajuste `.github/workflows/ci.yml` e `.github/workflows/release.yml` para os comandos reais
   do projeto (instalar, lint, testar, buildar).
4. Copie `.env.example` para `.env` e preencha os valores locais.
5. Remova este README genérico e escreva a documentação real do produto.

## Estrutura de pastas

```
.
├── AGENTS.md            # contexto para agentes de IA
├── docs/                # documentação viva: arquitetura, ADRs, runbook
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
└── config/              # arquivos de configuração por ambiente
```

Cada pasta vazia tem um `README.md` explicando sua responsabilidade.

## Saiba mais

- [AGENTS.md](AGENTS.md) — como agentes de IA devem trabalhar neste repositório
- [docs/architecture.md](docs/architecture.md) — princípios de arquitetura
- [CONTRIBUTING.md](CONTRIBUTING.md) — fluxo de contribuição

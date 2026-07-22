# 0001 - Registro de decisões de arquitetura

- Status: aceita
- Data: 2026-07-22

## Contexto

Ao longo do projeto, decisões de arquitetura são tomadas com frequência: escolha de
tecnologia, mudança de padrão entre camadas, adoção ou remoção de uma dependência
estrutural. Sem um registro, essas decisões e seus motivos se perdem — quem chega depois
(humano ou agente de IA) só vê o resultado no código, sem entender o porquê, e corre o
risco de reverter ou contradizer uma escolha já avaliada.

## Decisão

Adotamos Architecture Decision Records (ADRs) como formato padrão para registrar decisões
de arquitetura, seguindo esta estrutura:

- **Contexto**: qual problema ou situação motivou a decisão.
- **Decisão**: o que foi decidido, de forma direta.
- **Consequências**: o que essa decisão implica — trade-offs, restrições futuras, o que
  fica mais fácil e o que fica mais difícil.

Cada ADR é um arquivo Markdown em `docs/decisions/`, nomeado como `NNNN-titulo-curto.md`,
com numeração sequencial. ADRs não são editados após aceitos — uma decisão revista vira um
novo ADR que referencia o anterior.

## Consequências

- Toda mudança de arquitetura relevante (ver [CONTRIBUTING.md](../../CONTRIBUTING.md)) passa
  a exigir um ADR como parte da PR.
- Agentes de IA e novos desenvolvedores podem consultar `docs/decisions/` para entender o
  histórico de decisões sem precisar perguntar ou inferir do código.
- Isso adiciona um pequeno custo de processo (escrever o ADR), compensado por reduzir
  retrabalho e decisões contraditórias no futuro.

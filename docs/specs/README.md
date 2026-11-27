# Specs

Uma spec descreve uma tarefa não trivial **antes** da implementação. O fluxo (ver
[AGENTS.md](../../AGENTS.md)) é: spec → aprovação → implementação → `pnpm check` →
critérios de aceite conferidos.

Spec é diferente de ADR: a spec planeja um trabalho e pode ter várias etapas; o ADR
([docs/decisions/](../decisions/)) registra uma decisão de arquitetura e seu porquê. Uma
spec pode gerar um ADR.

## Quando escrever

- Mudança que toca várias partes do código ou exige uma decisão de design.
- Nova funcionalidade, nova integração, mudança de arquitetura ou de processo.
- Qualquer coisa em que "pronto" não seja óbvio.

Não precisa de spec: typo, ajuste pontual, correção de poucas linhas sem decisão.

## Arquivo

`docs/specs/NNNN-titulo-curto.md`, numeração sequencial própria (independente dos ADRs).

## Formato

```markdown
# NNNN — Título

- Status: rascunho | aprovada | em andamento | concluída | descartada
- Escopo: o que está dentro e o que fica fora

## Contexto

Problema, situação atual e o que motivou a spec. Inclua achados verificáveis do repositório.

## Decisão

O que será feito e os princípios/restrições que guiam a implementação.

## Tarefas

Lista numerada e verificável. Se a spec for grande, divida em etapas; cada etapa com suas
tarefas e seus critérios de aceite.

## Critérios de aceite

Condições observáveis que definem "pronto". Sempre inclui `pnpm check` passando, mais
critérios específicos (comportamento, falhas esperadas, saídas a mostrar).
```

Seções extras (achados, próximos passos, referências) são bem-vindas quando ajudam.
A [0001](0001-template-ai-native.md) é um exemplo real: os princípios fazem o papel de
"Decisão" e cada etapa traz tarefas e critérios de aceite próprios.

## Status

Atualize o campo `Status` conforme a spec avança. Não reescreva uma spec concluída: uma
mudança de rumo vira uma nova spec que referencia a anterior.

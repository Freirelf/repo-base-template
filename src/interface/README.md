# interface

Pontos de entrada do sistema: controllers HTTP, comandos de CLI, handlers de fila,
resolvers GraphQL, etc.

Traduz requisições externas em chamadas para `application/` e formata a resposta de volta.
Não contém regra de negócio — apenas tradução entre o mundo externo e os casos de uso.

Veja [docs/architecture.md](../../docs/architecture.md) para o racional completo.

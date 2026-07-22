# application

Casos de uso: orquestram entidades e portas definidas em `domain/` para realizar uma ação
completa (ex: "criar pedido", "cancelar assinatura").

Depende apenas de `domain/`. Não conhece detalhes de implementação de `infrastructure/` nem
como as requisições chegam pela `interface/`.

Veja [docs/architecture.md](../../docs/architecture.md) para o racional completo.

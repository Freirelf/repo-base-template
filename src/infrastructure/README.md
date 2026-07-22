# infrastructure

Adapters: implementações concretas das portas definidas em `domain/` — acesso a banco de
dados, chamadas a APIs externas, filas, filesystem, cache, etc.

Cada integração externa deve implementar uma interface (porta) do domínio, nunca ser
consumida diretamente por `application/` ou `domain/`.

Veja [docs/architecture.md](../../docs/architecture.md) para o racional completo.

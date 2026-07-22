# Arquitetura

## Princípio central: inversão de dependência

O código em `src/` é organizado em quatro camadas. A regra que sustenta tudo:

> **`domain/` não importa nada de `infrastructure/` nem de `interface/`.**

As dependências apontam sempre para dentro, em direção ao domínio:

```
interface  ──▶  application  ──▶  domain  ◀──  infrastructure
```

- `interface/` e `infrastructure/` dependem de `domain/` e `application/`.
- `domain/` não depende de nada externo — nem de frameworks, nem de bibliotecas de
  banco de dados, nem de SDKs de terceiros.

## Como isso funciona na prática

1. **`domain/`** define as regras de negócio e as **interfaces (portas)** que descrevem o
   que o mundo externo precisa fornecer — por exemplo, uma porta `UserRepository` com os
   métodos `findById`, `save`, etc. Essa interface não sabe se por trás existe Postgres,
   um arquivo JSON ou uma API remota.

2. **`application/`** implementa os casos de uso, orquestrando entidades e portas do
   domínio. Não conhece detalhes técnicos de como as portas são implementadas.

3. **`infrastructure/`** contém os **adapters**: implementações concretas das portas
   definidas no domínio. Um `PostgresUserRepository` implementa a porta `UserRepository`
   usando uma biblioteca de banco de dados real. Se trocar de Postgres para outro banco,
   só o adapter muda — domínio e aplicação permanecem intactos.

4. **`interface/`** é onde o mundo externo entra: controllers HTTP, comandos de CLI,
   handlers de fila, resolvers GraphQL. Essa camada traduz uma requisição externa em uma
   chamada a um caso de uso em `application/` e traduz a resposta de volta ao formato
   externo (JSON, texto, etc.).

## Por que isso importa

- **Testabilidade**: `domain/` e `application/` podem ser testados sem banco de dados,
  sem rede, sem infraestrutura — só com implementações fake das portas.
- **Substituibilidade**: trocar um banco, uma fila ou um provedor externo não exige
  reescrever regra de negócio, só o adapter correspondente em `infrastructure/`.
- **Foco**: quem lê `domain/` entende o que o sistema faz, sem ruído de detalhes técnicos.

## Registrando decisões

Mudanças que afetem esses limites — nova porta, novo adapter estrutural, mudança na forma
como as camadas se comunicam — devem virar um ADR em [docs/decisions/](decisions/). Veja o
exemplo em [0001-registro-de-decisoes.md](decisions/0001-registro-de-decisoes.md).

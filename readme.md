# Programa de Bolsas HubDev
Desafio `Node JS` com `Express`, `TypeScript`, `TypeORM`, `Postgres` e `Docker` desenvolvido para o programa de bolsas HubDev da HubLocal

## Banco de dados
docker run --name hubdevcontainer -e POSTGRES_DB=hubdevDB -e POSTGRES_USER=hubdev -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

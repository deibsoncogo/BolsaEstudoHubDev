# Programa de Bolsas HubDev
Desafio `Node JS` com `Express`, `TypeScript`, `TypeORM`, `Postgres` e `Docker` desenvolvido para o programa de bolsas HubDev da HubLocal

## Insomnia
Para conseguir executar os métodos recomendamos o programa chamado de `Insomnia`, abaixo existe um botão vai permitir a importação dos dados com facilidade

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=HUBDEV&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fdeibsoncogo%2FHubDev%2Fmaster%2Fsrc%2Fassets%2FInsomnia-All_2022-01-05.json)

## Banco de dados
Para a criação do banco de dados foi utilizado o `Docker` para assim criar um ambiente isolado com `Postgres` e com o `TypeORM` para criar as tabelas

#### Para criar o ambiente isolado utilize este comando
```bash
docker run --name hubdevcontainer -e POSTGRES_DB=hubdevDB -e POSTGRES_USER=hubdev -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

#### Agora execute este para criar as tabelas a partir das migrations
```bash
yarn typeorm migration:run
```

#### Para iniciar ou pausar o ambiente do Docker
Ele entra em execução automaticamente quando criado, depois teremos que utilizar estes comandos
```bash
docker start hubdevcontainer
```
```bash
docker stop hubdevcontainer
```


## Aplicação
Para a criação do backend foi utilizado principal o `Node JS`, `Express` e `TypeScript`

#### Para instalar todas dependências
```bash
yarn
```

#### Para executar o servidor
Ele executará na porta 3333
```bash
yarn dev
```


## Ferramentas e dependências utilizado
As ferramentas utilizadas foram: `Yarn`, `Docker`, `Node JS` e `TypeScript`

As dependências utilizadas foram: `bcryptjs`, `express`, `express-async-errors`, `jsonwebtoken`, `pg`, `reflect-metadata`, `swagger-ui-express`, `tsyringe`, `typeorm`, `uuid` e `yup`

Dependências usadas em modo de desenvolvimento: `eslint`, `ts-node-dev` e `typescript`

## Rotas
Endereço principal: `http://localhost/3333`

### Usuário
**POST** /user - Essa rota será responsável por criar um usuário
```ts
{ // schema body
  "name": string,
  "cpf": number,
  "email": string,
  "password": string
}

// respostas
status(400).json({ message: "Dados inválido" });
status(400).json({ message: "Já existe CPF cadastrado" });
status(400).json({ message: "Já existe email cadastrado" });
status(201).json({
  id: string,
  createdAt: timestamp,
  updatedAt: timestamp,
  name: string,
  cpf: number,
  email: string
}); // usuário criado
```

**GET** /user - Essa rota será responsável por buscar os usuários a partir dos critérios de busca
```ts
{ // security bearer token
  "token": string
}
{ // schema query
  "id": string,
  "name": string,
  "cpf": string,
  "email": string,
}

// respostas
status(404).json({ message: "Token não informado" });
status(401).json({ message: "Token inválido" });
status(400).json({ message: "Dados inválido" });
status(200).json([{
  id: string,
  createdAt: timestamp,
  updatedAt: timestamp,
  name: string,
  cpf: number,
  email: string
}]);  // usuário buscado
```

**PUT** /user/one/:id - Essa rota será responsável por alterar informações do usuário
```ts
{ // security bearer token
  "token": string
}
{ // schema query
  "name": string,
  "cpf": string,
  "email": string,
  "passwordOld": string,
  "passwordNew": string,
}

// respostas
status(401).json({ message: "Token não informado" });
status(401).json({ message: "Token inválido" });
status(204).json({ message: "Nenhum valor foi informado" });
status(400).json({ message: "Dados inválido" });
status(404).json({ message: "Não existe um usuário com este ID cadastrado" });
status(400).json({ message: "Já existe CPF cadastrado" });
status(400).json({ message: "Já existe email cadastrado" });
status(401).json({ message: "Senha antiga inválida" });
status(201).json({
  id: string,
  createdAt: timestamp,
  updatedAt: timestamp,
  name: string,
  cpf: number,
  email: string
}); // usuário alterado
```

**DELETE** /user/:id - Essa rota será responsável por excluir um usuário
```ts
{ // security bearer token
  "token": string
}
{ // schema params
  "id": string
}

// respostas
status(401).json({ message: "Token não informado" });
status(401).json({ message: "Token inválido" });
status(400).json({ message: "Dados inválido" });
status(404).json({ message: "Não existe um usuário com este ID cadastrado" });
status(204).json(); // usuário excluído
```

### Autenticação
**POST** /user/authentication - Essa rota será responsável criar o token de autenticação do usuário
```ts
{ // schema body
  "email": string,
  "password": string
}

// respostas
status(400).json({ message: "Dados inválido" });
status(401).json({ message: "Email ou senha inválido" });
status(201).json({ token: string }); // token criado
```

### Empresa
**POST** /company - Essa rota será responsável por criar uma empresa
```ts
{ // security bearer token
  "token": string
}
{ // schema body
  "corporateName": string,
  "fantasyName": string,
  "cnpj": number,
  "departamento": string,
  "contact": number,
  "email": string,
  "userOwnerId": string,
  "addressId": string
}

// respostas
status(401).json({ message: "Token não informado" });
status(401).json({ message: "Token inválido" });
status(400).json({ message: "Dados inválido" });
status(400).json({ message: "Já existe esta ração social cadastrada" });
status(400).json({ message: "Já existe este CNPJ cadastrado" });
status(400).json({ message: "Não existe um usuário com este ID" });
status(400).json({ message: "Não existe um endereço com este ID" });
status(201).json({
  id: string,
  createdAt: timestamp,
  updatedAt: timestamp,
  corporateName: string,
  fantasyName: string,
  cnpj: number,
  departamento: string,
  contact: number,
  email: string,
  userOwnerId: string,
  addressId: string,
 }); // empresa criada
```

**GET** /company - Essa rota será responsável por buscar as empresas a partir dos critérios de busca
```ts
{ // security bearer token
  "token": string
}
{ // schema query
  "id": string,
  "corporateName": string,
  "fantasyName": string,
  "cnpj": string,
  "departamento": string,
  "contact": string,
  "email": string,
  "userOwnerId": string,
  "addressId": string,
}

// respostas
status(404).json({ message: "Token não informado" });
status(401).json({ message: "Token inválido" });
status(400).json({ message: "Dados inválido" });
status(201).json([{
  id: string,
  createdAt: timestamp,
  updatedAt: timestamp,
  corporateName: string,
  fantasyName: string,
  cnpj: number,
  departamento: string,
  contact: number,
  email: string,
  userOwnerId: string,
  addressId: string,
}]); // empresa buscada
```

**GET** /company/all - Essa rota será responsável por buscar todas empresas cadastrada trazendo as informações das chaves estrangeiras
```ts
{ // security bearer token
  "token": string
}

// respostas
status(404).json({ message: "Token não informado" });
status(401).json({ message: "Token inválido" });
status(201).json([{
  id: string,
  createdAt: timestamp,
  updatedAt: timestamp,
  corporateName: string,
  fantasyName: string,
  cnpj: number,
  departamento: string,
  contact: number,
  email: string,
  userOwnerId: string,
  addressId: string,
  address: {
    id: string,
    createdAt: string,
    updatedAt: string,
    publicPlace: string,
    number: string,
    state: string,
    city: string,
    country: string,
  },
  user: {
    id: string,
    createdAt: timestamp,
    updatedAt: timestamp,
    name: string,
    cpf: number,
    email: string
  }
}]); // empresa buscada
```

**PUT** /company/:id - Essa rota será responsável por alterar informações da empresa
```ts
{ // security bearer token
  "token": string
}
{ // schema query
  "corporateName": string,
  "fantasyName": string,
  "cnpj": string,
  "departamento": string,
  "contact": string,
  "email": string,
  "userOwnerId": string,
  "addressId": string,
}

// respostas
status(401).json({ message: "Token não informado" });
status(401).json({ message: "Token inválido" });
status(204).json({ message: "Nenhum valor foi informado" });
status(400).json({ message: "Dados inválido" });
status(404).json({ message: "Não existe este ID de empresa cadastrado" });
status(400).json({ message: "Já existe esta ração social cadastrada" });
status(400).json({ message: "Já existe este CNPJ cadastrado" });
status(400).json({ message: "Não existe um usuário com este ID" });
status(400).json({ message: "Não existe um endereço com este ID" });
status(201).json({
  id: string,
  createdAt: timestamp,
  updatedAt: timestamp,
  corporateName: string,
  fantasyName: string,
  cnpj: number,
  departamento: string,
  contact: number,
  email: string,
  userOwnerId: string,
  addressId: string,
}); // empresa alterada
```

**DELETE** /user/:id - Essa rota será responsável por excluir uma empresa
```ts
{ // security bearer token
  "token": string
}
{ // schema params
  "id": string
}

// respostas
status(401).json({ message: "Token não informado" });
status(401).json({ message: "Token inválido" });
status(400).json({ message: "Dados inválido" });
status(404).json({ message: "Não existe este ID de endereço cadastrado" });
status(204).json(); // empresa excluída
```

### Endereço
**POST** /address - Essa rota será responsável por criar um endereço
```ts
{ // schema body
  "publicPlace": string,
  "number": string,
  "state": string,
  "city": string,
  "country": string,
}

// respostas
status(400).json({ message: "Dados inválido" });
status(400).json({ message: "Já existe este endereço cadastrado" });
status(201).json({
  createdAt: timestamp,
  updatedAt: timestamp,
  publicPlace: string,
  number: string,
  state: string,
  city: string,
  country: string,
}); // usuário criado
```

**GET** /address - Essa rota será responsável por buscar os endereços a partir dos critérios de busca
```ts
{ // schema query
  "id": string,
  "publicPlace": string,
  "number": string,
  "state": string,
  "city": string,
  "country": string
}

// respostas
status(400).json({ message: "Dados inválido" });
status(200).json([{
  id: string,
  createdAt: timestamp,
  updatedAt: timestamp,
  name: string,
  cpf: number,
  email: string
}]);  // usuário buscado
```

**PUT** /address/:id - Essa rota será responsável por alterar informações do endereço
```ts
{ // security bearer token
  "token": string
}
{ // schema query
  "publicPlace": string,
  "number": string,
  "state": string,
  "city": string,
  "country": string
}

// respostas
status(401).json({ message: "Token não informado" });
status(401).json({ message: "Token inválido" });
status(204).json({ message: "Nenhum valor foi informado" });
status(400).json({ message: "Dados inválido" });
status(404).json({ message: "Não existe este ID de endereço cadastrado" });
status(400).json({ message: "Já existe este endereço no cadastrado" });
status(201).json({
  id: string,
  createdAt: timestamp,
  updatedAt: timestamp,
  name: string,
  cpf: number,
  email: string
}); // usuário alterado
```

**DELETE** /address/:id - Essa rota será responsável por excluir um endereço
```ts
{ // security bearer token
  "token": string
}
{ // schema params
  "id": string
}

// respostas
status(401).json({ message: "Token não informado" });
status(401).json({ message: "Token inválido" });
status(400).json({ message: "Dados inválido" });
status(404).json({ message: "Não existe este ID de endereço cadastrado" });
status(204).json(); // usuário excluído
```

# 🛒 Devnology Fullstack Challenge

Este projeto é uma solução completa de e-commerce desenvolvida para o desafio técnico da Devnology, com foco em integração de produtos de dois fornecedores, gerenciamento de carrinho de compras e finalização de pedidos com persistência.

---

## 📚 Índice

- [📁 Estrutura do Projeto](#estrutura-do-projeto)
- [🚀 Tecnologias Utilizadas](#tecnologias-utilizadas)
- [🐳 Como rodar o projeto com Docker](#como-rodar-o-projeto-com-docker)
- [🖥️ Como rodar o projeto localmente](#como-rodar-o-projeto-localmente)
- [🔙 Backend (NestJS)](#backend-nestjs)
  - [📡 Rotas disponíveis (API NestJS)](#rotas-disponiveis-api-nestjs)
- [🌐 Web (Next.js)](#web-nextjs)
  - [🌐 Rotas da aplicação web (Next.js)](#rotas-da-aplicacao-web-nextjs)
- [✅ Funcionalidades](#funcionalidades)
- [🧠 Decisões Técnicas](#decisoes-tecnicas)

---

## 📁 Estrutura do Projeto

```
devnology-ecommerce/
├── backend/            # API NestJS
├── web/                # Interface web em Next.js (React)
```

---

## 🚀 Tecnologias Utilizadas

- **Frontend**: React (Next.js)
- **Backend**: Node.js (NestJS)
- **State Management**: React Context
- **ORM**: TypeOrm
- **Estilização**: Tailwind CSS
- **Persistência de pedidos**: SQLite
- **APIs externas**: Brazilian & European Provider (via MockAPI)

---

## 🐳 Como rodar o projeto com Docker

### ✅ Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 📦 Passos

1. Clone o repositório

```bash
git clone https://github.com/MSpilari/devnology_app
cd devnology_app
```

2. Execute o Docker Compose

```bash
docker-compose up -d --build
```

Esse comando irá:

- Buildar as imagens do backend e frontend
- Instalar dependências
- Iniciar os serviços simultaneamente

### 🌐 Acesso

- Frontend: [http://localhost:3001](http://localhost:3001)
- Backend/API: [http://localhost:3000](http://localhost:3000)

### 🔄 Derrubar os containers

```bash
docker-compose down
```

> ✅ Os containers estão configurados com `force-dynamic` no Next.js para garantir SSR sempre que necessário.

---

## 🖥️ Como rodar o projeto localmente

### ✅ Pré-requisitos

- Node.js (v18+)
- Yarn ou npm

---

### 🔧 Clonando o repositório

```bash
git clone https://github.com/MSpilari/devnology_app
cd devnology_app
```

---

## 🔙 Backend (NestJS)

### 1. Acesse a pasta do backend

```bash
cd devnology_backend
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure o `.env`

Crie um arquivo `.env` na raiz do backend, pode seguir o exemplo do `.env.example` com:

```env
BRAZILIAN_PROVIDER_URL=http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider
EUROPEAN_PROVIDER_URL=http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider
COMMON_URL=http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/
FRONT_END_URL=http://localhost:3001
PORT=Porta que deseja configurar
```

Caso não configure a porta ele rodará automaticamente na 3000.

### 4. Inicie o servidor

```bash
npm run start
# ou
yarn start
```

A API estará disponível em: [http://localhost:PORT](http://localhost:PORT) ou [http://localhost:3000](http://localhost:3000)

---

### 5. 📡 Rotas disponíveis (API NestJS)

#### 🔍 `GET /products`

Retorna todos os produtos combinados (brasileiros e europeus).

**Query Params:**

- `page` (opcional, default: `1`)
- `limit` (opcional, default: `10`)
- `name` (filtra por nome)
- `category` (filtra por categoria)

---

#### 📦 `GET /products/:provider/:id`

Retorna os detalhes de um único produto.

**Parâmetros de rota:**

- `provider`: `brazilian_provider` ou `european_provider`
- `id`: ID do produto no fornecedor

**Exemplo:**
`GET /products/brazilian_provider/1`

---

#### 📜 `GET /orders`

Retorna todos os pedidos já realizados.

---

#### 🛒 `POST /orders`

Cria um novo pedido com os produtos do carrinho.

**Body (JSON):**

```json
{
  "customerName": "test",
  "products": [
    {
      "id": "brazilian_provider/1",
      "nome": "range of formal shirts",
      "preco": "127.00",
      "quantidade": "2"
    },
    {
      "id": "brazilian_provider/2",
      "nome": "Fantastic Steel Salad",
      "preco": "716.00",
      "quantidade": "2"
    }
  ]
}
```

---

## 🌐 Web (Next.js)

### 1. Acesse a pasta da aplicação web

```bash
cd ../
cd devnology_frontend
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
```

### 3. Configure o `.env`

Crie um arquivo `.env`, seguindo o exemplo do `.env.example`, na raiz com:

```env
API_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Inicie o frontend

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em: [http://localhost:3000](http://localhost:3000), por padrão ou outra porta caso a 3000 esteja ocupada

---

### 🌐 Rotas da aplicação web (Next.js)

- `/` — Página inicial com listagem de produtos
- `/cart` — Página do carrinho de compras
- `/orders` — Página de pedidos

---

## ✅ Funcionalidades

- Na página inicial, listagem paginada de produtos integrando dois fornecedores (BR + EU), o usuário pode consultar as páginas, pesquisar por nome ou categoria.
- Clicando em um produto, pode visualizar os detalhes do mesmo, bem como selecionar a quantidade deseja e enviar o produto ao carrinho.
- Carrinho de compras com a possibilidade de exclusão de produto do mesmo, além do cálculo do total do pedido
- Finalização do pedido após inserção do nome do cliente
- Persistência dos pedidos em banco SQLite
- Tabela de pedidos finalizados

---

## 🧠 Decisões Técnicas

### 1. **Stack principal**

- **Frontend:** Utilizei **Next.js**, que oferece Server-Side Rendering (SSR) utilizado nas páginas Home, orders e products, isso melhora SEO(Otimização para mecanismos de busca) e performance na primeira renderização. Além do roteamento automático e boa integração com React.
- **Backend:** Optei por **NestJS**, pois vocês ressaltaram a preferência por este framework.

### 2. **Integração com múltiplos fornecedores**

- O sistema consome dados de **duas APIs externas** (brasileira e europeia). O backend trata essa integração e **unifica o formato dos dados** para que o frontend possa consumir de forma consistente, como se fosse uma única API.

### 3. **Cache nas requisições a APIs externas**

- Para **minimizar a dependência das APIs de terceiros** e melhorar a performance da aplicação, implementei **caching com o módulo de cache do NestJS**.
- Adotei o padrão **Cache-Aside**, no qual:

  - Primeiro, o backend **verifica se os dados estão no cache**.
  - Caso estejam, **retorna diretamente**, reduzindo a latência.
  - Caso não estejam, **faz a requisição à API externa**, armazena o resultado no cache e retorna os dados.

- Isso traz ganhos importantes:

  - ✅ Melhora o desempenho em requisições repetidas;
  - ✅ Reduz chamadas desnecessárias às APIs externas;
  - ✅ Garante maior resiliência em caso de instabilidade dos fornecedores.

---

### 4. **Arquitetura em camadas no backend (NestJS)**

- O backend foi estruturado utilizando a **Arquitetura em Camadas (Layered Architecture)**, separando de forma clara as responsabilidades da aplicação:

  - **Controllers:** Responsáveis por receber as requisições HTTP e direcioná-las corretamente;
  - **Services:** Contêm a lógica de negócio, como integração com as APIs de terceiros e persistência de pedidos via Repository do TypeORM;
  - **DTOs:** Validação e tipagem dos dados recebidos nas requisições;
  - **Entities:** Representam os modelos utilizados no banco de dados SQLite.

✅ Essa separação garante:

- Maior **organização e manutenibilidade**;
- Facilidade para **testes unitários** isolados;
- Melhor escalabilidade à medida que novas regras de negócio ou integrações sejam adicionadas.

---

### 5. **Persistência de dados**

- Os **pedidos realizados** são persistidos utilizando **SQLite**.
- Optei por um banco de dados **relacional (SQL)** em vez de uma solução NoSQL por razões de:

  - **Estabilidade e maturidade** dos bancos SQL;
  - **Consistência forte** nos dados, o que é fundamental em sistemas que lidam com **transações financeiras** e **pedidos estruturados**.

- Utilizei **TypeORM**, que permite uma integração fluida com o banco via **ORM (Object-Relational Mapping)** e com o **NestJS**, facilitando a modelagem de entidades, validações.
- Além disso, o uso de **validações e constraints** ajuda a garantir que regras importantes sejam respeitadas, como:

  - O campo `total` do pedido **não aceitar valores negativos**;
  - A integridade entre pedidos e os produtos vinculados.

✅ Essa abordagem garante:

- **Segurança e confiabilidade** na manipulação de dados sensíveis;
- Facilidade na **evolução do modelo de dados**;
- Melhor controle sobre as **regras de negócio críticas** do sistema.

---

### 6. **Arquitetura do frontend**

- Adotei uma **arquitetura baseada em domínio**, onde o código é organizado por funcionalidades e responsabilidades:

  - `app/` contém as rotas e estrutura principal da aplicação (páginas como `/`, `/cart`, etc.).
  - `components/` agrupa componentes reutilizáveis, organizados por contexto, como `productClientSection`, `cartSummary`, `ordersTable`, etc.
  - `context/` e `hooks/` abrigam a lógica de estado e reuso, como `useCart`, de forma isolada da UI.
  - `types/` centraliza os tipos TypeScript utilizados no projeto, melhorando consistência e tipagem.

- Essa estrutura:

  - Favorece a **escalabilidade e manutenção**, pois separa claramente UI, lógica de estado e tipos.
  - Permite **alta reutilização de componentes** entre páginas.
  - Está alinhada com os princípios de **componentização do React** e boas práticas modernas em projetos com **Next.js**.

---

### 7. **Utilizando Context no Componente Cart**

O uso do **React Context** no componente **Cart** é uma decisão técnica que visa **gerenciar o estado global do carrinho de forma eficiente e escalável**, atendendo aos seguintes pontos:

1. **Compartilhamento de estado entre múltiplos componentes**
   O carrinho geralmente é acessado e manipulado por vários componentes na aplicação — como lista de produtos, cabeçalho (ícone do carrinho), página de checkout, etc. O Context permite que esses componentes **acessam e atualizem o estado do carrinho diretamente, sem a necessidade de passar props manualmente por múltiplos níveis** da árvore de componentes.

2. **Evitar "prop drilling"**
   Sem Context, seria necessário passar informações do carrinho como props por muitos níveis intermediários que não utilizam esse dado, o que torna o código mais verboso, menos manutenível e sujeito a erros.

3. **Melhor performance e organização**
   O Context permite centralizar a lógica de estado e métodos para manipular o carrinho (como adicionar, remover produtos, limpar o carrinho). Isso torna o código mais organizado, facilita testes e melhora a performance, pois o React gerencia melhor a atualização apenas dos componentes que consomem o Context.

4. **Escalabilidade**
   À medida que a aplicação cresce, o estado do carrinho pode ficar mais complexo (itens, quantidades, preços, descontos, etc.). O Context oferece uma estrutura robusta para manter esse estado global sincronizado e consistente em toda a aplicação.

---

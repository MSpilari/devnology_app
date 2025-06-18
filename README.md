# 🛒 Devnology Fullstack Challenge

Este projeto é uma solução completa de e-commerce desenvolvida para o desafio técnico da Devnology, com foco em integração de produtos de dois fornecedores, gerenciamento de carrinho de compras e finalização de pedidos com persistência.

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
FRONT_END_URL= Insira aqui a url do seu front end
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
API_URL=Insira a URL da sua Api Nest
NEXT_PUBLIC_API_URL=Insira a URL da sua Api Nest
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

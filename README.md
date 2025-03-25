

# Quick Talk Box - API

**Quick Talk Box (QTalkBox)** é a API de uma rede social voltada para comunicação rápida e simples entre usuários. Esta API gerencia cadastro, login e estrutura base para funcionalidades sociais, sendo ideal como ponto de partida para apps de mensagens, fóruns rápidos ou trocas de ideias em tempo real.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** — ambiente de execução JavaScript
- **TypeScript** — linguagem com tipagem estática
- **Express** — framework web para Node.js
- **SQLite** — banco de dados leve e embutido
- **Knex.js** — query builder para SQL

---
## 📁 Estrutura de Pastas

```
src/
├── business/         # Lógica de negócios
├── controller/       # Controle das requisições
├── database/         # Configuração e acesso ao banco
├── dtos/             # Data Transfer Objects (validação de dados)
├── errors/           # Tratamento de erros personalizados
├── models/           # Modelos de dados
├── router/           # Definição das rotas da API
└── index.ts          # Ponto de entrada da aplicação
```

---

## 📦 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/qtalkbox-api.git
   cd qtalkbox-api
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. (Opcional) Configure variáveis de ambiente em um arquivo `.env` se necessário:
   ```
   PORT=3003
   DATABASE_PATH=./database.db
   ```

---

## ▶️ Como Executar

### Ambiente de Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

A API ficará disponível em `http://localhost:3003` (ou porta definida no `.env`).

---

## 📌 Funcionalidades da API

### Cadastro de Usuário
- **POST** `/users/signup`
  - **Body:**
    ```json
    {
      "name": "Usuário",
      "email": "usuario@exemplo.com",
      "password": "senhaSegura"
    }
    ```
  - **Resposta:** `201 Created` — Usuário registrado com sucesso.

### Login de Usuário
- **POST** `/users/login`
  - **Body:**
    ```json
    {
      "email": "usuario@exemplo.com",
      "password": "senhaSegura"
    }
    ```
  - **Resposta:** `200 OK` com token JWT de autenticação.

---

## 🗃️ Banco de Dados

- Banco: **SQLite** (`database.db`)
- Script de criação: `database.sql`

### Resetar o Banco de Dados:
```bash
sqlite3 database.db < database.sql
```

---


## 🧰 Scripts Úteis

- `npm run dev` — Inicia servidor com hot reload
- `npm run build` — Compila TypeScript para JavaScript
- `npm start` — Executa servidor compilado



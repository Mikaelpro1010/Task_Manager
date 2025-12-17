# 📝 Task Manager

Este repositório é composto por **dois projetos separados**, um **back-end (Laravel)** e um **front-end (SPA com Vite)**.  
Para que a instalação funcione corretamente, **respeite exatamente a estrutura de pastas abaixo**.

---

## 📁 Estrutura do Projeto

```text
.
├── api-tasks/        # Back-end (Laravel)
│   ├── app
│   ├── bootstrap
│   ├── config
│   ├── database
│   ├── public
│   ├── resources
│   ├── routes
│   ├── storage
│   ├── tests
│   ├── vendor
│   ├── .env
│   ├── composer.json
│   ├── artisan
│   └── README.md
│
└── tasks-front/      # Front-end (SPA)
    ├── app
    │   ├── src
    │   ├── public
    │   ├── index.html
    │   ├── package.json
    │   ├── tsconfig.json
    │   ├── vite.config.ts
    │   └── README.md
```

---

## 🎯 Objetivo do Projeto

O **Task Manager** tem como objetivo fornecer uma **API REST** para gerenciamento de tarefas, permitindo que usuários possam se autenticar e gerenciar suas tarefas (criar, listar, atualizar e remover) de forma segura.  
O projeto foi desenvolvido para integração com aplicações **SPA**, utilizando **Laravel Sanctum com autenticação baseada em cookies**, sem uso de tokens manuais.

---

## ⚙️ Requisitos para Instalação

### 🔧 Back-end (Laravel)

📂 **Diretório:** `api-tasks/`

**Requisitos:**
- PHP >= 8.1  
- Composer  
- MySQL (ou outro banco compatível)

**Instalação das dependências:**

```bash
cd api-tasks
composer install
```

---

### 🎨 Front-end (SPA)

📂 **Diretório:** `tasks-front/app/`

**Requisitos:**
- Node.js >= 18  
- NPM ou Yarn  

**Instalação das dependências:**

```bash
cd tasks-front/app
npm install
```

ou

```bash
cd tasks-front/app
yarn install
```

---

## 🔗 Principais Rotas da API

### 🔓 Rotas Públicas

| Método | Rota | Descrição |
|-------|------|----------|
| POST | `/api/register` | Cadastro de usuário |
| POST | `/api/login` | Login do usuário |
| GET  | `/sanctum/csrf-cookie` | Geração do cookie CSRF |

---

### 🔐 Rotas Protegidas (`auth:sanctum`)

| Método | Rota | Descrição |
|-------|------|----------|
| POST | `/api/logout` | Logout do usuário |
| GET  | `/api/me` | Dados do usuário autenticado |
| GET  | `/api/tasks` | Listagem de tarefas |
| POST | `/api/tasks` | Criação de tarefa |
| PUT  | `/api/tasks/{id}` | Atualização de tarefa |
| DELETE | `/api/tasks/{id}` | Remoção de tarefa |

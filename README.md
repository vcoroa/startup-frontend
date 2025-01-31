# Sistema de Gerenciamento de Usuários

Sistema web responsivo desenvolvido com Angular 19 para gerenciamento de usuários com operações CRUD e validação em tempo real.

## Funcionalidades

- ✨ Interface responsiva com Bootstrap 5
- 📋 Listagem de usuários com paginação
- ➕ Cadastro de novos usuários
- 📝 Edição de usuários existentes
- 🗑️ Exclusão de usuários
- 📸 Preview de avatar com integração DiceBear
- ✅ Validação de formulários em tempo real
- 📱 Máscara para formatação de telefone
- 🔒 Validação de campos obrigatórios
- 🌐 Integração com API REST

## Pré-requisitos

- Node.js 18.x
- NPM 9.x
- Angular CLI 19.1.5

## Instalação

```bash
# Clone o repositório
git clone https://github.com/vcoroa/startup-frontend.git

# Acesse o diretório
cd startup-frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

## Estrutura do Projeto

src/
├── app/
│   ├── components/
│   │   ├── user-add/      # Componente de adição
│   │   ├── user-edit/     # Componente de edição  
│   │   └── user-list/     # Componente de listagem
│   ├── models/
│   │   └── user.model.ts  # Interface de usuário
│   ├── services/
│   │   └── user.service.ts # Serviço da API
│   ├── app.component.ts    # Componente principal
│   ├── app.routes.ts       # Configuração de rotas
│   └── app.config.ts       # Configuração do app
└── styles.css              # Estilos globais

## Scripts Disponíveis

# Servidor de desenvolvimento
npm start 

# Build de produção
npm run build

# Executa testes unitários
npm test

# Build em modo watch
npm run watch

## Modelo de Dados

```typescript
interface User {
    id?: string;
    nome: string;
    email: string;
    telefone: string;
    avatar?: string;
    createdAt?: string;
}
```

## Endpoints da API

# A aplicação consome uma API REST com os seguintes endpoints:

GET    /api/v1/users       # Lista usuários
GET    /api/v1/users/:id   # Obtém usuário
POST   /api/v1/users       # Cria usuário 
PUT    /api/v1/users/:id   # Atualiza usuário
DELETE /api/v1/users/:id   # Remove usuário


## Configuração de Ambiente

# O projeto utiliza variáveis de ambiente definidas em:

- src/environments/environment.ts - Desenvolvimento
- src/environments/environment.prod.ts - Produção

## Build de Produção

# Para gerar o build otimizado para produção:

```bash
npm run build
```

# Os arquivos serão gerados no diretório dist/.


## Testes

# Executa testes unitários
npm test

# Executa testes com coverage
npm run test:coverage


## Dependências Principais

- Angular 19.1.0
- Bootstrap 5.3.3
- NgxMask 17.0.4
- RxJS 7.8.0

## Suporte
# Em caso de dúvidas ou problemas:

- Abra uma issue no repositório
- Envie um email para vanilton.coelho@gmail.com


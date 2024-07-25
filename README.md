# Challenge Frontend

Este é o frontend do projeto Challenge Fullstack. Desenvolvido usando React, TypeScript e Relay, este projeto inclui uma interface para criar um novo usuário, fazer transferências e visualizar um dashboard.

## Tecnologias Utilizadas

- **React**: Biblioteca para a construção da interface de usuário.
- **Vite**: Ferramenta de build para desenvolvimento rápido.
- **TypeScript**: Superset de JavaScript para tipagem estática.
- **GraphQL**: Linguagem de consulta para APIs.
- **Relay**: Framework para gerenciamento de dados GraphQL.
- **Tailwind CSS**: Framework para estilização e design responsivo.
- **shadcn/ui**: Biblioteca de componentes para construção de interfaces de usuário.
- **MUI (Material-UI)**: Biblioteca de componentes UI para React.

## Estrutura do Projeto

- **`src/`** - Código fonte do projeto.
  - **`services/`** - Hooks personalizados para mutações GraphQL.
    - **`useAddFunds.ts`** - Hook para adicionar fundos.
    - **`useSendFunds.ts`** - Hook para enviar fundos.
    - **`useCreateUser.ts`** - Hook para criar um novo usuário.
  - **`main.tsx`** - Ponto de entrada da aplicação.
  - **`App.tsx`** - Configuração das rotas e estrutura principal da aplicação.
  - **`pages/`** - Componentes das páginas principais.
    - **`dashboard/`** - Página do dashboard.
      - **`index.tsx`** - Componente da página do dashboard.
    - **`login/`** - Página de login.
      - **`index.tsx`** - Componente da página de login.

## Instalação

1. Clone o repositório:

```bash
   git clone https://github.com/WillMS28/front-challenge
```

Navegue para o diretório do projeto:

```bash
cd challenge-front
```

Instale as dependências:

```bash
npm install
```

Execução
Para iniciar o servidor de desenvolvimento, execute:

```bash
npm run dev
```

Para compilar as definições do Relay, execute:

```bash
npm run relay
```

Uso
Página de Login: Permite a criação de um novo usuário. Preencha o nome e o usuário do GitHub e clique em "Create".
Dashboard: Após o login, você será redirecionado para o dashboard onde pode ver as transações e enviar fundos para outros usuários.

# Check-in Car API

![Badge de Status (Exemplo)](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Badge da Licença (Exemplo)](https://img.shields.io/badge/license-MIT-blue)
<!-- Adicione outros badges relevantes aqui (ex: build, coverage) -->

API backend desenvolvida com Node.js, Express, TypeScript e Prisma para gerenciar o processo de check-in e check-out de veículos, incluindo gerenciamento de usuários e carros.

## Features Principais

*   **Autenticação:** Sistema de login seguro usando JWT (JSON Web Tokens).
*   **Gerenciamento de Usuários:** CRUD (Create, Read, Update, Delete) para usuários.
*   **Gerenciamento de Carros:** CRUD para informações dos veículos.
*   **Registro de Check-in/Check-out:** Lógica para registrar entradas e saídas de veículos.
*   **Middleware de Autenticação:** Proteção de rotas que exigem login.
*   **Tratamento de Erros:** Middleware centralizado para lidar com erros da aplicação.
*   **Hashing de Senhas:** Armazenamento seguro de senhas usando Bcrypt.

## Tecnologias Utilizadas

*   **Node.js:** Ambiente de execução JavaScript no servidor.
*   **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
*   **Express:** Framework web minimalista para Node.js.
*   **Prisma:** ORM (Object-Relational Mapper) moderno para Node.js e TypeScript.
    *   Utilizado com **PostgreSQL** (ou o banco de dados configurado no `schema.prisma`).
*   **JSON Web Token (jsonwebtoken):** Para geração e verificação de tokens de autenticação.
*   **BcryptJS:** Para hashing de senhas.
*   **Dotenv:** Para carregar variáveis de ambiente a partir de um arquivo `.env`.
*   **ts-node-dev:** Para executar o projeto em modo de desenvolvimento com reinicialização automática.
*   **Cors:** Para habilitar Cross-Origin Resource Sharing.
*   **Express Async Errors:** Para simplificar o tratamento de erros em rotas assíncronas do Express.

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

*   [Node.js](https://nodejs.org/) (Versão LTS recomendada)
*   [Yarn](https://yarnpkg.com/) ou [NPM](https://www.npmjs.com/) (gerenciador de pacotes do Node)
*   Uma instância do banco de dados configurado no `prisma/schema.prisma` (ex: [PostgreSQL](https://www.postgresql.org/)) rodando localmente ou acessível.
*   [Git](https://git-scm.com/)

## Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/AdemirRed/check-in-car-API.git
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd check-in-car-API
    ```

3.  **Instale as dependências:**
    ```bash
    # Usando Yarn
    yarn install

    # Ou usando NPM
    npm install
    ```

## Configuração

1.  **Variáveis de Ambiente:**
    *   Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`:
        ```bash
        cp .env.example .env
        ```
    *   Abra o arquivo `.env` e preencha as variáveis com os seus dados:
        *   `DATABASE_URL`: A URL de conexão com o seu banco de dados (ex: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`).
        *   `JWT_SECRET`: Um segredo forte e único para assinar os tokens JWT.
        *   `PORT`: A porta em que a API será executada (padrão: 3333).

2.  **Banco de Dados (Prisma):**
    *   Execute as migrações do Prisma para criar/atualizar as tabelas no seu banco de dados com base no schema (`prisma/schema.prisma`):
        ```bash
        # Usando Yarn
        yarn prisma migrate dev

        # Ou usando NPM
        npx prisma migrate dev
        ```
    *   (Opcional, mas pode ser necessário após instalar dependências ou alterar o schema) Gere o cliente Prisma:
        ```bash
        # Usando Yarn
        yarn prisma generate

        # Ou usando NPM
        npx prisma generate
        ```

## Executando a Aplicação

*   **Modo de Desenvolvimento:**
    *   Este comando utiliza `ts-node-dev` para executar a API e reiniciar automaticamente quando detectar alterações nos arquivos `.ts`.
    ```bash
    # Usando Yarn
    yarn dev

    # Ou usando NPM
    npm run dev
    ```
    *   A API estará disponível em `http://localhost:PORT` (a porta definida no seu `.env`, padrão 3333).

*   **Modo de Produção:**
    1.  **Compile o código TypeScript para JavaScript:**
        ```bash
        # Usando Yarn
        yarn build

        # Ou usando NPM
        npm run build
        ```
        Isso criará uma pasta `dist` com os arquivos JavaScript compilados.

    2.  **Inicie o servidor a partir dos arquivos compilados:**
        ```bash
        # Usando Yarn
        yarn start

        # Ou usando NPM
        npm start
        ```

## Estrutura do Projeto (Visão Geral)



## Endpoints da API (Exemplos)

**Atenção:** Esta é uma lista de *exemplos* baseada na estrutura comum. Verifique a pasta `src/routes` para a lista completa e detalhada dos endpoints.

*   **Autenticação**
    *   `POST /login`: Autentica um usuário e retorna um token JWT.
    *   `POST /refresh-token`: (Se implementado) Gera um novo token JWT usando um refresh token.

*   **Usuários**
    *   `POST /users`: Cria um novo usuário.
    *   `GET /users`: Lista usuários (pode requerer permissão de admin).
    *   `GET /users/me`: Retorna os dados do usuário autenticado.
    *   `PUT /users/me`: Atualiza os dados do usuário autenticado.
    *   `DELETE /users/:id`: Deleta um usuário (pode requerer permissão de admin).

*   **Carros**
    *   `POST /cars`: Cria um novo carro.
    *   `GET /cars`: Lista todos os carros.
    *   `GET /cars/:id`: Obtém detalhes de um carro específico.
    *   `PUT /cars/:id`: Atualiza informações de um carro.
    *   `DELETE /cars/:id`: Remove um carro.

*   **Check-ins**
    *   `POST /checkin`: Registra a entrada (check-in) de um carro.
    *   `POST /checkout`: Registra a saída (check-out) de um carro.
    *   `GET /checkins`: Lista os registros de check-in/check-out (filtros podem ser aplicáveis).

*Recomenda-se usar ferramentas como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) para testar os endpoints.*

## Contribuição

Contribuições são bem-vindas! Se você encontrar um bug ou tiver uma sugestão de melhoria, sinta-se à vontade para abrir uma *issue* ou um *pull request*.

1.  Faça um *fork* do projeto.
2.  Crie uma nova *branch* (`git checkout -b feature/nova-feature`).
3.  Faça *commit* das suas alterações (`git commit -m 'Adiciona nova feature'`).
4.  Faça *push* para a *branch* (`git push origin feature/nova-feature`).
5.  Abra um *Pull Request*.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes (se houver um arquivo LICENSE, caso contrário, pode remover esta frase ou adicionar a licença diretamente aqui).

---

*Desenvolvido por [Ademir/RedBlack]*

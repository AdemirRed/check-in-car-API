# Check-in Car API

Uma API simples para gerenciar check-ins de carros.

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado.
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) instalado.
- Crie um arquivo `.env` na raiz do projeto com as variáveis de ambiente necessárias.

## Instalação

1. Clone o repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd check-in-car-API
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:

   ```properties
   PORT=3002
   ```

## Uso

1. Inicie o servidor:

   ```bash
   npm start
   ```

2. Acesse a API em [http://localhost:3002](http://localhost:3002).

## Endpoints

### GET /

- **Descrição**: Retorna uma mensagem de boas-vindas.
- **Resposta**:
  ```json
  "Hello World!"
  ```

## Scripts Disponíveis

- `npm start`: Inicia o servidor.

## Estrutura do Projeto

```
check-in-car-API/
├── src/
│   ├── app.js         # Configuração do aplicativo Express
│   ├── server.js      # Inicialização do servidor
├── .env               # Variáveis de ambiente
├── package.json       # Configurações do projeto e dependências
└── README.md          # Documentação do projeto
```

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

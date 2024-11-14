# BookBridge API

**BookBridge** é uma aplicação que permite que os usuários se cadastrem, criem clubes de leitura, adicionem livros à lista de leitura do clube, e registrem suas opiniões sobre os livros lidos. A API oferece um sistema de autenticação JWT para garantir a segurança dos dados dos usuários.

## Funcionalidades

### Funcionalidades Principais:

- **CRUD de Usuários**: Criação, leitura, atualização e exclusão de usuários.
- **CRUD de Clubes de Leitura**: Criação, leitura, atualização e exclusão de clubes de leitura.
- **Gerenciar Lista de Livros dos Clubes**: Adicionar e gerenciar livros na lista de leitura dos clubes.
- **Sistema de Autenticação JWT**: Autenticação de usuários via tokens JWT para proteger as rotas da API.
- **Persistência de Dados em Banco SQL**: Os dados são persistidos em um banco de dados SQL
- **Registar Opiniões e Avaliações**: Permite que os usuários registrem suas opiniões e avaliações sobre os livros lidos.

### Funcionalidades Adicionais:

- **Sistema de Cache**: Implementação de cache para melhorar a performance da API, evitando consultas repetidas ao banco de dados.
- **Média das Avaliações**: Endpoint adicional que fornece a média das avaliações dos livros.
- **Registro de Logs de Atividades**: A API registra logs para rastrear as atividades, erros e ações dos usuários.

## Arquitetura

A aplicação segue o padrão de **Arquitetura Limpa** (Clean Architecture), dividindo as responsabilidades em diferentes camadas:

- **Domain**: Contém as entidades e as regras de negócio.
- **Application**: Contém os casos de uso e a lógica de interação entre as entidades e os repositórios.
- **Data**: Responsável pela implementação dos repositórios que acessam o banco de dados.

## Endpoints

### Autenticação

- `POST /login`: Login do usuário.

### Usuários

- `POST /registerUser`: Criação de um novo usuário.
- `GET /users`: Lista todos os usuários.
- `PUT /users/{id}`: Atualizar dados do usuário.
- `DELETE /users/{id}`: Excluir usuário.

### Clubes de Leitura

- `POST /bookClub`: Criar um novo clube de leitura.
- `GET /bookClub`: Listar todos os clubes de leitura.
- `PUT /bookClub/{id}`: Atualizar nome de um clube de leitura.
- `DELETE /bookClub/{id}`: Excluir um clube de leitura.

### Livros

- `PUT /book`:Criar um livro
- `PUT /bookClub/{id}/addBook`: Adicionar um livro ao clube de leitura.
- `DELETE /bookClub/{id}/deleteBook`: Deletar um livro do clube de leitura.

### Opiniões

- `POST /opinion`: Registrar uma opinião sobre um livro do clube.
- `POST /opinionAverage/:bookId`: Média de avaliação de um livro.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript para o back-end.
- **Fastify**: Framework web para Node.js, utilizado para criação de servidores rápidos e escaláveis.
- **Prisma ORM**: ORM para Node.js que facilita a interação com o banco de dados SQL.
- **JWT (JSON Web Token)**: Tecnologia utilizada para autenticação de usuários.
- **SQLite**: Banco de dados SQL utilizado para persistência de dados.
- **node-cache**: Biblioteca para implementação de cache em memória, melhorando a performance da API.
- **Bcryptjs**: Para hash de senhas e garantir a segurança dos dados dos usuários.


## Como Rodar a Aplicação

### 1. Clone o Repositório
### 2. Intale as dependencias --- npm install
### 3. Rode a aplicação --- npm run dev

https://www.youtube.com/watch?v=vNNyUdF3sbw vídeo de apresentação do projeto

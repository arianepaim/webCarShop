# Sistema de Veículos à Venda

O Sistema de Veículos à Venda é uma aplicação web que permite o controle de uma loja de carros. Os administradores podem adicionar, editar e excluir carros. A autenticação é gerenciada por tokens JWT. Este README fornece instruções detalhadas sobre como configurar, executar e utilizar o projeto.

## Tecnologias Utilizadas

- Backend: Java
- Frontend: React
- Banco de Dados: PostgreSQL
- Autenticação: JWT (JSON Web Tokens)

## Configuração do Banco de Dados

1. Certifique-se de ter o PostgreSQL instalado.
2. Inicie o PgAdmin e crie um banco de dados chamado "webCarShop".
3. No projeto backend, acesse a pasta "resources" e edite o arquivo "application.properties". Altere a senha do banco de dados para corresponder à senha do PostgreSQL que você está usando.

## Inicialização do Projeto

### Backend

No projeto backend, siga estas etapas:

1. Execute o código do projeto Java.

### Frontend

No projeto frontend, siga estas etapas:

1. Abra o terminal na pasta do frontend.
2. Execute o comando `npm install` para instalar todas as dependências.
3. Após a conclusão da instalação, execute `npm start` para iniciar o servidor frontend.

## Funcionalidades do Site

- Visualização de Carros e Detalhes: Os carros e seus detalhes podem ser visualizados sem a necessidade de login.
- Venda de Carros: Para vender um carro, é necessário fazer um registro e fazer login. A funcionalidade de enviar mensagem para um administrador ainda não foi implementada, mas o formulário para enviar a mensagem está disponível.
- Alteração de Senha e Logout: Após fazer login, os usuários podem alterar sua senha na página onde está o nome e fazer logout.

## Cadastro de Administrador

Para cadastrar um administrador, você pode fazê-lo diretamente no banco de dados ou utilizando uma ferramenta como Postman ou Insomnia:

- Endpoint: `http://localhost:8080/api/users`
- Método: POST

JSON para o cadastro de administrador:

```json
{
    "name": "Thais",
    "email": "thais@gmail.com",
    "password": "12345Th@",
    "role": "ADMIN"
}
```

Observe que, ao cadastrar um administrador, o cadastro pelo site será apenas para usuários.

## Usuários Pré-Cadastrados

Para fins de testes, já existem alguns usuários pré-cadastrados no banco de dados:

- Usuário: ravi@gmail.com, Senha: 12345R@v
- Administrador: ariane@gmail.com, Senha: 12345@Ri

## Funcionalidades do Administrador

Ao fazer login como administrador, é possível:

- Adicionar carros.
- Editar informações de carros.
- Excluir carros ao clicar nos cards.
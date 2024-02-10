# Fundamentos Node.js

API REST desenvolvida como Projeto do primeiro Módulo da trilha Node.js

Requisitos: https://efficient-sloth-d85.notion.site/Desafio-01-2d48608f47644519a408b438b52d913f

- O projeto é uma API para gerenciamento simples de tarefas (CRUD);
- O servidor foi criado sem a utilização de bibliotecas de terceiros, utilizando o módulo http do Node.js;
- A única exceção ao uso de bibliotecas externas foi para manipular dados em um arquivo csv, sendo a 'csv-parse' utilizada para tal objetivo;

Versões

- Node: v21.5.0
- csv-parse: ^5.5.3

## Como executar:

$ npm i

$ npm run dev

## Rotas:

GET http://localhost:3335/tasks

Retorna uma mensagem de boas vindas ao app.

POST http://localhost:3335/tasks

O corpo da requisição deve conter title e description.
Retorna os dados da tarefa criada.

{
"title": "Comprar macarrão",
"description": "Para o almoço"
}

DELETE http://localhost:3335/tasks/17165e33-d7b0-40f1-8455-b3a0afb9f98d

http://localhost:3335/tasks/:id onde :id deve ser substituído pelo id da tarefa a ser apagada.
Retorna os dados da tarefa excluída.

PUT http://localhost:3335/tasks/c5527467-9eaa-4fab-8d15-b2ecf853956a

http://localhost:3335/tasks/:id onde :id deve ser substituído pelo id da tarefa a ser atualizada.
O corpo da requisição deve conter title, description ou ambos. Mas a ausência de ambos não é permitida.
Retorna os dados atualizados da tarefa.

{
"title": "Comprar peixes",
"description": "Comprar da espécie Tilápia"
}

PATCH http://localhost:3335/tasks/c5527467-9eaa-4fab-8d15-b2ecf853956a/complete

http://localhost:3335/tasks/:id onde :id deve ser substituído pelo id da tarefa a ser marcada como concluída.
Retorna os dados atualizados da tarefa.

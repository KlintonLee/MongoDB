# MongoDB com o driver nativo
Esta branch é uma simples POC pra entender o funcionamento do driver nativo do MongoDB utilizando o Nodejs.

## 🧰 Ferramentas utilizadas
- Docker & docker-compose
- Nodejs & npm

## 👨🏻‍💻 Como utilizar?
- Primeiro é necessário que o mongodb esteja executando localmente com usuário `root` e senha `docker`;
- Baixar as dependências necessárias com `npm install`
- Executar o script `npm run start`

## 🧬 Fluxo da aplicação
- Na pasta `examples` há um conjunto de funções de exemplos seguindo o modelo de `CRUD` - Create, Read, Update e Delete.
- Ao executar o script de start, o arquivo de entrada irá executar todas estas funções em uma sequência lógica e exibirá no console seus respectivos resultados.

## 🐳 Configuração do MongoDB

Antes de iniciarmos, precisamos ter uma base do **Mongodb** rodando na máquina ou no servidor. Aqui utilizaremos o **docker-compose** do repositório.

```
docker-compose up -d
```

Para certificar-se que o ***mongo está rodando***, basta abrir o navegador e digitar **localhost:27017**. Se o navegador devolver a seguinte mensagem:

- **its looks like you are trying to access MongoDB over HTTP on the native driver port.**

Significa que estamos tentando acessar o **mongoDB** pelo navegador, o que não é permitido. Porém, existe ferramentas com interface como **MongoDB Compass Comunity** e **Robo3T**

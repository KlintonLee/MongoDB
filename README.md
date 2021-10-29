# MongoDB

## O que é o MongoDB?
É um banco de dados open-source orientado a documentos e composto de coleções. Permite alta performance, alta disponibilidade e é fácil de escalar (horizontal).

## O que é documento?
Os documentos são formatados como JSON binário, ou seja, constitem de pares de chave: valor.
```
{
  "class": "stormtrooper",
  "artillery": true
}
```

## São schemaless
Isso significa que dentro da mesma collection, um documento não tem a obrigatoriedade de possuir a mesma estrutura entre eles. Por exemplo:
```
[
  {
    "class": "stormtrooper",
    "artillery": true
  },
  {
    "name": "luke",
    "class": "jedi"
    "race": "humanoid"
  }
]
```
Isso permite a inclusão de novas propriedades sem precisar mudar a estrutura da tabela, se compararmos ao SQL.


## Seleção 
### Inserindo documentos
- insertOne() - Insere apenas um documento, inclusive, se a collection não existir é criada em tempo de execução.
- sintaxe: `db.my_collection.insertOne(<documento>)`
```
{
  "name": "luke",
  "class": "jedi"
  "race": "humanoid"
}
```

- insertMany() - Insere multiplos documentos, e como parâmetro os documentos devem vir em arrays `[]`
- sintaxe: `db.my_collection.insertMany([<documento>, <documento>])`
```
[
  {
    "class": "stormtrooper",
    "artillery": true
  },
  {
    "name": "luke",
    "class": "jedi"
    "race": "humanoid"
  }
]
```

## Consultando documentos
- findOne() - Consulta um único documento e, quanto usada sem parâmetros retorna o primeiro documento.
  - sintaxe: `db.collection.findOne(<query>, <projection>)`
- find() - Consulta multiplos documentos e, quando usada sem parâmetros retorna o cursor todos os documentos da coleção.
  - sintaxe: `db.collection.find(<query>, <projection>)`
- **query** - opcional - Especifica o filtro, para omitir este parâmetro basta passar `{}`
- **pojection** - opctional - O parâmetro projection especifica quais campos retornar:
  - `db.customers.find({}, { name: 1 })` = retorna _id e name, para remover o _id utilizar `{ name: 1, _id: 0 }`
- **Extra**: pretty() serve para identar o resultado do método no terminal, ficando mais fácil de ler
  - sintaxe: `db.collection.find().pretty()`

### Critérios [Documentation](https://docs.mongodb.com/upcoming/reference/operator/query/)
Servem para filtrarmos consultas baseado nos critérios que definirmos. Lembre-se que o MongoDB é case-sensitive, ou seja, letras maiúsculas e minúsculas tem impacto diferente.
- Filtrando propriedade, a seguir veremos as duas principais funções (findOne e find). Basta passarmos um objeto como `{ name: "Luke" }` e o registro(s) retornado será o(s) documento(s) com a propriedade name `igual` Luke.
- Operadores de comparação:
  ```
    $eq: exatamente igual (=)
    $ne: diferente (<> ou !=)
    $gt: maior do que (>)
    $gte: maior ou igual a (>=)
    $lt: menor do que (<)
    $lte: menor ou igual a (<=)

    $and: recebe um array de expressões // find({ $and: [{ price: { $ne: 1.99 } }, { price: { $exists: true } }] })
    $or: recebe um array de expressões // .find({ $or: [{ quantity: { $lt: 20 } }, { price: 10 }] })
    
    $in: match dos valores especificados no array { "age": { $in : [28,20] } }
    $nin: oposto de $in { "color": { $nin: ["white", "black", /^light.+/] } } // obs: permite regex
    $regex: critério a partir do regex { name: { $regex: /^a.+/ } } // n0mes que iniciam com 'a'

    Exemplos:
    db.customers.find().skip(1).limit(10)
    db.customers.find().sort({idade: 1})  // (crescente (1) ou descrescente (-1)

  ```
### Seleção de algúns métodos do cursor: [Documentation](https://docs.mongodb.com/manual/reference/method/js-cursor/)
Esses métodos modificam a maneira como a consulta subjacente é executada.
  ```
    .count() - Retorna a quantidade de documentos encontrado na query
    .skip(1) - Retorna os resultados a partir número passado no parâmetro
    .limit(10) - Limita a quantidade de documentos a serem retornados
    .sort({ idade: 1 }) // Utilize o 1 ou -1 para específicar ascendente e descendente
    .map() // Aplica o map na execução da query.
  ```
### Combinando condições
Podemos facilmente combinar filtros usando vírgulas dentro do documento passado por parâmetro
- `db.customers.find({nome: "Luiz", idade: {$gte: 18}})`
- `db.customers.find({nome: { $regex: /a/ }, idade: {$gte: 18}})`

## Atualizando Documentos
- updateOne() - Consulta um único documento baseado no filtro e atualiza, caso deseje o retorno utilizar **findOneAndUpdate**
  - sintaxe: `db.collection.updateOne(filter, update, options)`
- updateMany() - Consulta multiplos documentos baseado no filtro e atualiza
  - sintaxe: `db.collection.updateMany(filter, update, options)`
- **filter** - São os critérios de filtro, o mesmos do exemplo passado de **Consultar documentos**
- **update** - As modificações a serem aplicadas a partir das tags:
- $set - adiciona e/ou atualiza campos existentes;
  - `db.Customers.updateOne({"name": "Klinton"}, {$set: { active: true }})` // Adiciona campo active com valor true
- $unset - remove um campo do documento;
  - `db.Pokemon.updateOne({"name": "Pikachu"}, {$unset: { thunderbolt: "" }})` // Remove thunderbolt
- $currentDate - Define o valor de um campo para a data atual;
  - `db.Employee.updateOne({"name": "Klinton"}, {$currentDate: {joiningDate: true}})` // Upd campo joiningDate
  - `db.Employee.updateOne({"name": "Klinton"}, {$currentDate: {"details.updatedAt": true}})` // Upd campo aninhado
  - `db.Employee.updateOne({"name": "Klinton"}, {$currentDate: {newDate: {$type: "date"}}})` // Add newDate

## Deletando Documentos
- deleteOne() - Consulta um único documento baseado no filtro e remove da coleção
  - sintaxe: `db.collection.deleteOne(filter)` 
- deleteMany() - Consulta multiplos documentos baseado no filtro e os remove da coleção
  - sintaxe: `db.collection.deleteMany(filter)`
  - Nota: `db.collection.deleteMany({})` Passando deleteMany desta forma irá excluir **todos** documentos
- **filter** - São os critérios de filtro, o mesmos do exemplo passado de **Consultar documentos**
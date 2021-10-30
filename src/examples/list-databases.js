/**
 * Print on console the list of created databases;
 * @param client MongoClient connection
 */
const listDatabases = async (client) => {
  const databaseList = await client
    .db()
    .admin()
    .listDatabases();

  console.log("examples/list-databases.js - Databases:");
  databaseList.databases.forEach(db => {
    console.log(`- ${db.name}`);
  })
  console.log('');
}

module.exports = { listDatabases }

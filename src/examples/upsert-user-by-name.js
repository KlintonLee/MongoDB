/**
 * Updates the first occurence of user that matches with old category param and
 * updates to new category, if document does not exists, then insert the new obj
 * @param client MongoDB client
 * @param oldCategory category to be updated
 * @param newUser new user object to be inserted if user was not found
 */
 const upsertUserByName = async (client, oldCategory, newUser) => {
  const result = await client
    .db('my_database')
    .collection('users')
    .updateOne(
      { category: oldCategory },
      { $set: { category: newUser } },
      { upsert: true }  
    );

  console.log(`examples/upsert-user-by-name.js - ${result.matchedCount} document(s) matched the query criteria`);
  
  if (result.upsertedCount > 0) {
    console.log(`examples/upsert-user-by-name.js - One document was inserted with the id ${result.upsertedId}`);
  } else {
    console.log(`examples/upsert-user-by-name.js - ${result.modifiedCount} document(s) was/were updated`);
  }
  console.log('');
}

module.exports = { upsertUserByName }
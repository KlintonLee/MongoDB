/**
 * Updates the first occurence of user that matches with old category param and
 * updates to new category
 * @param client MongoDB client
 * @param oldCategory category to be updated
 * @param newCategory new category value
 */
const updateCategoryFromUser = async (client, oldCategory, newCategory) => {
  const result = await client
    .db('my_database')
    .collection('users')
    .updateOne(
      { category: oldCategory },
      { $set: { category: newCategory } }  
    );

  console.log(`examples/update-category-from-user.js - ${result.matchedCount} document(s) matched the query criteria`);
  console.log(`examples/update-category-from-user.js - ${result.modifiedCount} document(s) was/were updated`);
  console.log('');
}

module.exports = { updateCategoryFromUser }
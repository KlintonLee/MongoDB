/**
 * Find multiple users that has the same category
 * @param client MongoDB client
 * @param category category to be found at users collection
 */
const findMultipleUsersByCategory = async (client, category) => {
  const cursor = await client
    .db('my_database')
    .collection('users')
    .find({ category });
  
  const users = await cursor.toArray();
  if (users.length) {
    console.log(`examples/find-multiple-users-by-category.js - Found users in the collection with category ${category}`);
    console.log(JSON.stringify(users));
  } else {
    console.log(`examples/find-multiple-users-by-category.js - No users found with the category ${category}`);
  }
  console.log('');
}

module.exports = { findMultipleUsersByCategory }
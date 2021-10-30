/**
 * Find the first occurence of name in users collection and log it on console
 * @param client MongoDB client
 * @param name name to be found at users collection
 */
const findOneUserByName = async (client, name) => {
  const user = await client
    .db('my_database')
    .collection('users')
    .findOne({ name });

  if (user) {
    console.log(`examples/find-one-user-by-name.js - Found a user in the collection with name ${name}`);
    console.log(`examples/find-one-user-by-name.js - ${JSON.stringify(user)}`);
  } else {
    console.log(`examples/find-one-user-by-name.js - No users found with the name ${name}`);
  }
  console.log('');
}

module.exports = { findOneUserByName }
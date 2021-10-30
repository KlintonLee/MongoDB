/**
 * Update each document that does not have origin property, then fill with
 * Star Wars as value
 * @param client MongoDB client
 */
const updateMultipleUsersToHaveOriginProperty = async (client) => {
  const result = await client
    .db('my_database')
    .collection('users')
    .updateMany(
      { origin: { $exists: false } },
      { $set: { origin: 'Star Wars' } }
    );

  console.log(`examples/update-multiple-users-to-have-origin-property.js - ${result.matchedCount} document(s) matched the query criteria`);
  console.log(`examples/update-multiple-users-to-have-origin-property.js - ${result.modifiedCount} document(s) was/were updated`);
  console.log('');
}

module.exports = { updateMultipleUsersToHaveOriginProperty }
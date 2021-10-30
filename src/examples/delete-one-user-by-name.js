/**
 * Deletes one user by name passed as parameter
 * @param client MongoDB client
 * @param nameOfUser name to match criteria
 */
const deleteOneUserByname = async (client, nameOfUser) => {
  const result = await client
    .db('my_database')
    .collection('users')
    .deleteOne({ name: nameOfUser });

  console.log(`examples/delete-one-user-by-name.js - ${result.deletedCount} document(s) was/were deleted`);
  console.log('');
}

module.exports = { deleteOneUserByname }
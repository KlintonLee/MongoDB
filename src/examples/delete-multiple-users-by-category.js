/**
 * Deletes many users that matches with category passed as parameter from
 * users collection
 * @param client MongoDB client
 * @param categoryOfUser category to matche criteria
 */
const deleteMultipleUsersByCategory = async (client, categoryOfUser) => {
  const result = await client
    .db('my_database')
    .collection('users')
    .deleteMany({ category: categoryOfUser });

  console.log(`examples/delete-multiple-users-by-category.js - ${result.deletedCount} document(s) was/were deleted`);
  console.log('');
}

module.exports = { deleteMultipleUsersByCategory }
const { client } = require('./common/mongodb');

const { listDatabases } = require('./examples/list-databases');
const { createUser } = require('./examples/create-user');
const { createMultipleUsers } = require('./examples/create-multiple-users');
const { findOneUserByName } = require('./examples/find-one-user-by-name');
const { findMultipleUsersByCategory } = require('./examples/find-multiple-users-by-category');
const { updateCategoryFromUser } = require('./examples/update-category-from-user');
const { upsertUserByName } = require('./examples/upsert-user-by-name');
const { updateMultipleUsersToHaveOriginProperty } = require('./examples/update-multiple-users-to-have-origin-property');
const { deleteOneUserByname } = require('./examples/delete-one-user-by-name');
const { deleteMultipleUsersByCategory } = require('./examples/delete-multiple-users-by-category');

async function run() {
  try {
    // Creating a connection
    console.log(`Connecting with MongoDB\n`);
    await client.connect();
    
    await listDatabases(client);

    await createUser(client, {
      category: "stormtrooper",
      artillery: true
    });

    await createMultipleUsers(client, [
      {
        "category": "stormtrooper",
        "artillery": true
      },
      {
        "name": "Rey",
        "category": ["jedi", "palpatine"],
        "race": "humanoid"
      },
      {
        "name": "luke",
        "category": "jedi",
        "has-saber": true
      }
    ]);

    await findOneUserByName(client, 'Rey');
    await findOneUserByName(client, 'Yoda');

    await findMultipleUsersByCategory(client, 'stormtrooper');
    await findMultipleUsersByCategory(client, 'civil');

    await updateCategoryFromUser(client, 'stormtrooper', 'super stormtrooper');

    await upsertUserByName(client, 'super user', { category: 'super user', name: 'some_name' });

    await updateMultipleUsersToHaveOriginProperty(client);

    await deleteOneUserByname(client, 'luke');

    await deleteMultipleUsersByCategory(client, 'stormtrooper');
  } finally {
    console.log('Closing connection with MongoDB');
    await client.close();
  }
}


run().catch(console.dir);
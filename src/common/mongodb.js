const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri, {
	auth: { username: 'root', password: 'docker' }
})

module.exports = { client }
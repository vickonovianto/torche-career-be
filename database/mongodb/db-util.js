const { MongoClient, ObjectId } = require('mongodb');

let _client;
let _db;

const connectDB = () => {
    MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .catch(err => {
        console.error(err.stack);
        process.exit();
    })
    .then(client => {
        _client = client;
        _db = client.db(process.env.DB_NAME);
    });
};

const getObjectId = () => ObjectId;

const getClient = () => _client;

const getDB = () => _db;

const getCollection = (collectionName) => _db.collection(String(collectionName));

const disconnectDB = () => _client.close();

module.exports = { getObjectId, connectDB, getClient, getDB, getCollection, disconnectDB };
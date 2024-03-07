const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/notesDb";

let _db;

const initDb = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url)
            .then(client => {
                _db = client.db();
                resolve(_db);
            })
            .catch(err => {
                reject(err);
            });
    });
};

const getDb = () => {
    return _db;
};

module.exports = {
    initDb,
    getDb
};

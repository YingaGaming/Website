const config = require('../../config.js')

var MongoClient = require('mongodb').MongoClient;

const server = config.database.url;
const db_name = config.database.name

let db

MongoClient.connect(server, (err, dbs) => {

    if (err) {
        console.error(err)
        process.exit()
    }

    db = dbs.db(db_name)
    console.log('Database Connected')
})

module.exports.insert = (collection, obj, cb) => {
    return new Promise((resolve, reject) => {
        db.collection(collection).insertOne(obj, (err, res) => {
            if (err) return reject(err);
            resolve()
        })
    })
}

module.exports.query = (collection, query, cb) => {
    return new Promise((resolve, reject) => {
        db.collection(collection).find(query).toArray(function(err, result) {
            if (err) return reject(err);
            resolve(result)
        });
    })
}

module.exports.update = (collection, query, newvals, cb) => {
    return new Promise((resolve, reject) => {

        obj = {
            $set: newvals
        }

        db.collection(collection).updateOne(query, obj, function(err, res) {
            if (err) return reject(err);
            resolve()
        });
    })
}

module.exports.delete = (collection, query, cb) => {
    return new Promise((resolve, reject) => {
        db.collection(collection).deleteOne(query, function(err, res) {
            if (err) return reject(err);
            resolve()
        });
    })
}
const {MongoClient} = require('mongodb')
const assert = require('assert')

const url = 'mongodb://localhost:27017/poshly'

MongoClient.connect(url, (err, db) => {
  assert.equal(null, err)
  console.log('Connected successfully to server')
  insertDocuments(db, () => {})
  findDocuments(db, () => {
    db.close()
  })
})

const insertDocuments = (db, callback) => {
  const collection = db.collection('documents')
  collection.insertMany({
    name: {firstName: firstName, lastName: lastName},
    address: {street: street, city: city, zip: zip, state: state, country: country},
    phone: phoneNumber,
    email: emailAddress,
    customerId: customerId
  }, (err, result) => {
    assert.equal(err, null)
    assert.equal(3, result.result.n)
    assert.equal(3, result.ops.length)
    console.log('Inserted 3 documents into the collection')
  })
}

const findDocuments = (db, callback) => {
  const collection = db.collection('documents')
  collection.find({}).toArray((err, docs) => {
    assert.equal(err, null)
    console.log('Found the following records')
    console.log(docs)
    callback(docs)
  })
}

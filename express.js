const express = require('express')
const bodyParser = require('body-parser')
const {MongoClient} = require('mongodb')
const uuid = require('uuid/v4')

const url = 'mongodb://localhost:27017/poshly'

const app = express()

app.use(bodyParser.json())

const PORT = 3000

app.post('/inventory-items', (req, res) => {

  MongoClient.connect(url, (err, db) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    const inventory = db.collection('inventory')
    const id = uuid()
    const item = Object.assign({}, req.body, {
      id
    })
    inventory.insertOne(item, (err, result) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
        return db.close()
      }
      res.status(201).json(item)
      db.close()
    })
  })

})

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})

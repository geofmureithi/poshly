/* eslint-disable no-console */
const express = require('express')
const bodyParser = require('body-parser')
const {MongoClient} = require('mongodb')
const uuid = require('uuid/v4')

const url = 'mongodb://localhost:27017/poshly'

const app = express()

app.use(bodyParser.json())

app.use(express.static('public'))

const PORT = 3000

app.get('/inventory-items', (req, res) => {

  MongoClient.connect(url, (err, db) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    const inventory = db.collection('inventory')
    inventory.find().sort({description: 1}).toArray((err, result) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
        return db.close()
      }
      res.json(result)
      db.close()
    })
  })
})

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
    inventory.insert(item, (err, result) => {
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

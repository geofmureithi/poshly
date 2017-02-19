/* eslint-disable no-console */
const express = require('express')
const bodyParser = require('body-parser')
const {MongoClient} = require('mongodb')
const {inventoryItems} = require('./inventory-items')
const {customers} = require('./customers')

const url = 'mongodb://localhost:27017/poshly'

const PORT = 3000

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  const app = createApp(db)

  app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
  })
})

const createApp = (db) => {
  const inventory = inventoryItems(db)
  const customerCollection = customers(db)

  const app = express()

  app.use(bodyParser.json())

  app.use(express.static('public'))

  app.get('/inventory-items', (req, res, next) => {
    inventory
      .findAll()
      .then((items) => res.json(items))
      .catch((err) => next(err))
  })

  app.post('/inventory-items', (req, res, next) => {
    inventory
      .create(req.body)
      .then((item) => res.json(item))
      .catch((err) => next(err))
  })

  app.post('/customers', (req, res, next) => {
    customerCollection
      .create(req.body)
      .then((customer) => res.json(customer))
      .catch((err) => next(err))
  })
  // eslint-disable-next-line
  app.use((err, req, res, next) => {
    console.log(err)
    res.sendStatus(500)
  })

  return app
}

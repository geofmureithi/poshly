const uuid = require('uuid/v4')

const inventoryItems = (db) => {
  const inventory = db.collection('inventory')
  const findAll = () => {
    return inventory.find().sort({description: 1}).toArray()
  }
  const create = (body) => {
    const id = uuid()
    const item = Object.assign({}, body, {
      id
    })
    return inventory.insert(item).then(() => item)
  }

  return {findAll, create}
}

module.exports = {inventoryItems}

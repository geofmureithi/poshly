const uuid = require('uuid/v4')

const customers = (db) => {
  const collection = db.collection('customers')
  const create = (body) => {
    const id = uuid()
    const customer = Object.assign({}, body, {
      id
    })
    return collection.insert(customer).then(() => customer)
  }
  return {create}
}

module.exports = {customers}

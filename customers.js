const uuid = require('uuid/v4')

const customers = (db) => {
  const customerCollection = db.collection('customers')
  const create = (body) => {
    const id = uuid()
    const customer = Object.assign({}, body, {
      id
    })
    return customerCollection.insert(customer).then(() => customer)
  }
  const findAll = () => {
    return customerCollection.find().sort({lastName: 1}).toArray()
  }
  return {create, findAll}
}

module.exports = {customers}

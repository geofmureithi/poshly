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
  return {create}
}

module.exports = {customers}

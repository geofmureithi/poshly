const uuid = require('uuid/v4')

const invoiceCollection = (db) => {
  const invoices = db.collection('invoices')
  const create = (body) => {
    const id = uuid()
    const invoice = Object.assign({}, body, {
      id
    })
    return invoices.insert(invoice).then(() => invoice)
  }
  return {create}
}

module.exports = {invoiceCollection}

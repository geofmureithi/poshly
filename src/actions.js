const {store} = require('./store')

const createCustomer = (dispatch) => {
  const customerForm = store.getState().customerForm
  fetch('/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      customerForm
    )
  }).then(() => {
    dispatch({type: 'CUSTOMER_ADDED'})
    dispatch(viewUpdated('home'))
  })
}

const createItem = (dispatch) => {
  const itemForm = store.getState().itemForm
  fetch('/inventory-items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      itemForm
    )
  }).then(() => {
    dispatch({type: 'SUBMIT_ITEM'})
    dispatch(viewUpdated('home'))
  })
}

const customersLoaded = (customers) => {
  return {type: 'CUSTOMERS_LOADED', customers}
}

const fetchCustomers = (dispatch) => {
  fetch('/customers')
    .then((response) => response.json())
    .then((customers) => {
      dispatch(customersLoaded(customers))
      dispatch(viewUpdated('searchCustomers'))
    })
}

const fetchItems = (dispatch) => {
  fetch('/inventory-items')
    .then((response) => {
      return response.json()
  }).then((items) => {
    dispatch(itemsLoaded(items))
    dispatch(viewUpdated('searchItems'))
  })
}

const itemsLoaded = (items) => {
  return {type: 'ITEMS_LOADED', items}
}

const viewUpdated = (view) => {
  return {type: 'VIEW_UPDATED', view}
}

module.exports = {createCustomer, createItem, fetchCustomers, fetchItems, viewUpdated}

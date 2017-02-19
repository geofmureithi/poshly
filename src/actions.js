const {store} = require('./store')

const itemsLoaded = (items) => {
  return {type: 'ITEMS_LOADED', items}
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

const viewUpdated = (view) => {
  return {type: 'VIEW_UPDATED', view}
}

module.exports = {fetchItems, createItem, viewUpdated, createCustomer}

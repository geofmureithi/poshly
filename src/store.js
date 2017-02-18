const {createStore, applyMiddleware, combineReducers} = require('redux')
const thunk = require('redux-thunk').default

const createCustomer = (state = false, action) => {
  switch (action.type) {
    case 'CREATE_CUSTOMER':
      return true
    case 'HOME_PAGE':
      return false
    case 'CUSTOMER_ADDED':
      return false
    default:
      return state
  }
}

const customerForm = (state = {}, action) => {
  switch (action.type) {
    case 'CUSTOMER_FORM_UPDATED':
      return Object.assign({}, state, {
        [action.field]: action.value
      })
    case 'CUSTOMER_ADDED':
      return {}
    default:
      return state
  }
}

const term = (state = '', action) => {
  switch (action.type) {
    case 'TERM_UPDATED':
      return action.value
    default:
      return state
  }
}

const inventoryItems = (state = [], action) => {
  switch (action.type) {
    case 'ITEMS_LOADED':
      return state.concat(action.items)
    case 'HOME_PAGE':
      return []
    default:
      return state
  }
}

const itemForm = (state = {}, action) => {
  switch (action.type) {
    case 'FORM_UPDATED':
      return Object.assign({}, state, {
        [action.field]: action.value
    })
    case 'SUBMIT_ITEM':
      return {}
    default:
      return state
  }
}

const searchItems = (state = false, action) => {
  switch (action.type) {
    case 'SEARCH_ITEMS':
      return true
    case 'INVENTORY':
      return false
    case 'HOME_PAGE':
      return false
    default:
      return state
  }
}

const currentView = (state = 'home', action) => {
  switch (action.type) {
    case 'VIEW_UPDATED':
      return action.view
    default:
      return state

  }
}

const reducer = combineReducers({ currentView, createCustomer, customerForm, term, inventoryItems, itemForm, searchItems})

const store = createStore(reducer, applyMiddleware(thunk))

module.exports = {store}

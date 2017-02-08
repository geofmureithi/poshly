const {createStore} = require('redux')

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INVENTORY':
      return Object.assign({}, state, {
        console.log("This is inventory")
        state.inventoryButton: false,
        state.createItem: true
      })
      break
    case 'CREATE_ITEM':
      return Object.assign({}, state, {
        state.createItem: false,
        state.submitCreate: true
      })
      break
    case 'SUBMIT_CREATE':
      return Object.assign({}, state, {
        state.submitCreate: false,
        state.inventoryButton: true
      })
    default:
      return state
  }
}

const initialState = {
  inventoryButton: true,
  createItem: false,
  submitCreate: false
}

const store = createStore(reducer, initialState)

store.subscribe(dispatch({type: 'INVENTORY'}))

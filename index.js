const React = require('react')
const {render} = require('react-dom')
const {createStore, applyMiddleware, combineReducers} = require('redux')
const thunk = require('redux-thunk').default

const initialState = {
  inventoryButton: true,
  createItem: false,
  submitItem: false,
  itemForm: {
    sku: '',
    description: '',
    price: ''
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

const inventoryButton = (state = true, action) => {
  switch (action.type) {
    case 'INVENTORY':
      return false
    case 'SUBMIT_ITEM':
      return true
    default:
      return state
  }
}

const createItem = (state = false, action) => {
  switch (action.type) {
    case 'INVENTORY':
      return true
    case 'CREATE_ITEM':
      return false
    default:
      return state
  }
}

const submitItem = (state = false, action) => {
  switch (action.type) {
    case 'CREATE_ITEM':
      return true
    case 'SUBMIT_ITEM':
      return false
    default:
      return state
  }
}

const reducer = combineReducers({itemForm, inventoryButton, createItem, submitItem})

const store = createStore(reducer, initialState, applyMiddleware(thunk))

const HomePage = () => {
  const {inventoryButton} = store.getState()
  const handleClick = () => store.dispatch({type: "INVENTORY"})
  return (
    !inventoryButton
    ? null
    : <div className="inventory-button" onClick={handleClick}>Inventory</div>
  )
}

const Inventory = () => {
  const {createItem} = store.getState()
  const handleClick = () => store.dispatch({type: "CREATE_ITEM"})
  return (
    !createItem
    ? null
    : <div className="inventory-button" onClick={handleClick}>Create Item</div>
  )
}

const CreateItem = () => {
  const {submitItem} = store.getState()
  const handleSubmit = (event) => {
    event.preventDefault()
    store.dispatch(() => {
      const itemForm = store.getState().itemForm
      fetch('/inventory-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          itemForm
        )
      }).then(() => store.dispatch({type: 'SUBMIT_ITEM'}))
    })
  }
  const handleChange = (event) => {
    const value = event.target.value
    const field = event.target.getAttribute('name')
    store.dispatch({type: 'FORM_UPDATED', value, field})
  }
  return (
    !submitItem
    ? null
    : <form className="ui form centered grid add-inventory" onSubmit={handleSubmit}>
        <div className="field column nine wide inventory-properties">
          <label className="inventory-property">Item SKU</label>
          <input name="sku" type="text" className="inventory-value" onChange={handleChange}/>
        </div>
        <div className="field column nine wide inventory-properties">
          <label className="inventory-property">Description</label>
          <input name="description" type="text" className="inventory-value" onChange={handleChange}/>
        </div>
        <div className="field column nine wide inventory-properties">
          <label className="inventory-property">Price</label>
          <input name="price"  type="text" className="inventory-value" onChange={handleChange}/>
        </div>
        <div className="ui column nine wide centered aligned">
        <input type="submit" value="Submit Item" id="submit-item" className="massive ui positive button"/>
        </div>
      </form>
  )
}

const redraw = () => {
  render(
    <div className="container">
      <div className="header">POSHLY</div>
      <div className="main-buttons">
        <HomePage/>
        <Inventory/>
      </div>
      <CreateItem/>
    </div>,
    document.getElementById('root')
  )
}

store.subscribe(redraw)

redraw()

const React = require('react')
const {render} = require('react-dom')
const {createStore} = require('redux')

const initialState = {
  inventoryButton: true,
  createItem: false,
  submitItem: false,
  inventory: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INVENTORY':
    return Object.assign({}, state, {
      inventoryButton: false,
      createItem: true
    })
    break
    case 'CREATE_ITEM':
    return Object.assign({}, state, {
      createItem: false,
      submitItem: true
    })
    break
    case 'SUBMIT_ITEM':
    return Object.assign({}, state, {
      submitItem: false,
      inventoryButton: true
    })
    default:
    return state
  }
}

const store = createStore(reducer, initialState)

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
  const handleClick = () => store.dispatch({type: "SUBMIT_ITEM"})
  return (
    !submitItem
    ? null
    : <div className="add-inventory">
        <div className="inventory-properties">
          <div className="inventory-property">Item SKU</div>
          <div className="inventory-property">Description</div>
          <div className="inventory-property">Price</div>
        </div>
        <div className="inventory-values">
          <div className="ui input">
            <input type="text" className="inventory-value"/>
          </div>
          <div className="ui input">
            <input type="text" className="inventory-value"/>
          </div>
          <div className="ui input">
            <input type="text" className="inventory-value"/>
          </div>
        </div>
        <button className="submit-item massive ui button" onClick={handleClick}>Submit Item</button>
      </div>
  )
}

const redraw = () => {
  render(
    <div className="container">
      <div className="header">POSHLY</div>
      <div className="main-buttons">
        <HomePage/>
        <Inventory/>
        <CreateItem/>
      </div>
    </div>,
    document.getElementById('root')
  )
}

store.subscribe(redraw)

redraw()

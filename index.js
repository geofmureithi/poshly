const React = require('react')
const {render} = require('react-dom')
const {createStore, applyMiddleware, combineReducers} = require('redux')
const thunk = require('redux-thunk').default

const initialState = {
  homePage: true,
  inventoryPage: false,
  createItem: false,
  searchItems: false,
  inventoryItems: [],
  term: '',
  itemForm: {
    sku: '',
    description: '',
    price: ''
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

const homePage = (state = true, action) => {
  switch (action.type) {
    case 'INVENTORY':
      return false
    case 'SUBMIT_ITEM':
      return true
    case 'HOME_PAGE':
      return true
    default:
      return state
  }
}

const inventoryPage = (state = false, action) => {
  switch (action.type) {
    case 'INVENTORY':
      return true
    case 'CREATE_ITEM':
      return false
    case 'SEARCH_ITEMS':
      return false
    case 'HOME_PAGE':
      return false
    default:
      return state
  }
}

const createItem = (state = false, action) => {
  switch (action.type) {
    case 'CREATE_ITEM':
      return true
    case 'SUBMIT_ITEM':
      return false
    case 'HOME_PAGE':
      return false
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

const reducer = combineReducers({term, inventoryItems, itemForm, homePage, createItem, inventoryPage, searchItems})

const store = createStore(reducer, initialState, applyMiddleware(thunk))

const HomePage = () => {
  const {homePage} = store.getState()
  const handleClick = () => store.dispatch({type: "INVENTORY"})
  return (
    !homePage
    ? null
    : <div className="inventory-button" onClick={handleClick}>Inventory</div>
  )
}

const itemsLoaded = (items) => {
  return {type: 'ITEMS_LOADED', items}
}

const fetchItems = (dispatch) => {
  fetch('/inventory-items')
    .then((response) => {
      return response.json()
  }).then((items) => {
    dispatch(itemsLoaded(items))
    dispatch({type: 'SEARCH_ITEMS'})
  })
}

const InventoryPage = () => {
  const {inventoryPage} = store.getState()
  const handleClick = (event) => {
    const value = event.target.getAttribute('name')
    if (value === 'create-item') {
      store.dispatch({type: 'CREATE_ITEM'})
    } else if (value === 'search-items') {
        store.dispatch(fetchItems)
    }
  }
  return (
    !inventoryPage
    ? null
    : <div>
        <div name="create-item" className="inventory-button" onClick={handleClick}>Create Item</div>
        <div></div>
        <div name="search-items" className="inventory-button" onClick={handleClick}>Search Items</div>
      </div>
  )
}

const SearchItems = () => {
  const {searchItems, inventoryItems, term} = store.getState()
  if (!searchItems) {
    return null
  }
  const matches = inventoryItems.filter(item => {
    return item.description.toLowerCase().indexOf(term.toLowerCase()) > -1 || item.sku.indexOf(term) > -1
  })
  const handleChange = event => {
    const value = event.target.value
    store.dispatch({type: 'TERM_UPDATED', value})
  }
  return (
      <div className="ui form centered grid">
        <div className="field column nine wide inventory-properties">
          <label className="inventory-property">Search Inventory</label>
          <div id="search-inventory-container" className="ui icon input">
            <input id="search-inventory-bar" className="prompt" type="text" placeholder="enter description" onChange={handleChange}/>
            <i className="search icon"></i>
          </div>
        </div>
        <div id="table-scroll" className="column fourteen wide">
          <table id="inventory-table" className="ui striped table">
            <thead>
              <tr>
                <th className="table-number">#</th>
                <th>SKU</th>
                <th>Description</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody id="table-body">
              {matches.map((item, index) => {
                   return (
                     <tr key={index}>
                       <td>{index + 1}</td>
                       <td>{item.sku}</td>
                       <td>{item.description}</td>
                       <td><span>$</span>{item.price}</td>
                     </tr>
                   )
               })
            }
            </tbody>
          </table>
        </div>
      </div>
  )
}

const CreateItem = () => {
  const {createItem} = store.getState()
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
    !createItem
    ? null
    : <form className="ui form centered grid add-inventory" onSubmit={handleSubmit}>
        <div className="field column nine wide inventory-properties">
          <label className="inventory-property">Item SKU</label>
          <input name="sku" type="text" className="inventory-value" required onChange={handleChange}/>
        </div>
        <div className="field column nine wide inventory-properties">
          <label className="inventory-property">Description</label>
          <input name="description" type="text" className="inventory-value" required onChange={handleChange}/>
        </div>
        <div className="field column nine wide inventory-properties">
          <label className="inventory-property">Price</label>
          <input name="price"  type="text" className="inventory-value" required onChange={handleChange}/>
        </div>
        <div className="ui column nine wide centered aligned">
          <input type="submit" value="Submit Item" id="submit-item" className="massive ui positive button"/>
        </div>
      </form>
  )
}

const Header = () => {
  const handleClick = (event) => {
    const value = event.target.getAttribute('name')
    if (value === 'homeButton') {
      store.dispatch({type: 'HOME_PAGE'})
    }
  }
  return (
    <div name="homeButton" className="header" onClick={handleClick}>POSHLY</div>
  )
}

const redraw = () => {
  render(
    <div className="container">
      <Header/>
      <div className="main-buttons">
        <HomePage/>
        <InventoryPage/>
      </div>
      <CreateItem/>
      <SearchItems/>
    </div>,
    document.getElementById('root')
  )
}

store.subscribe(redraw)

redraw()

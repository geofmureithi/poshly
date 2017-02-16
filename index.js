const React = require('react')
const {render} = require('react-dom')
const {createStore, applyMiddleware, combineReducers} = require('redux')
const thunk = require('redux-thunk').default
const {fetchItems} = require('./actions.js')

const initialState = {
  homePage: true,
  inventoryPage: false,
  customerPage: false,
  createItem: false,
  searchItems: false,
  inventoryItems: [],
  term: '',
  itemForm: {
    sku: '',
    description: '',
    price: ''
  },
  customerForm: {
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
    email: ''
  }
}

const customerPage = (state = false, action) => {
  switch (action.type) {
    case 'CUSTOMERS':
      return true
    case 'HOME_PAGE':
      return false
    default:
      return state
  }
}

const customerForm = (state = {}, action) => {
  switch (action.type) {
    case 'CUSTOMER_ADDED':
      return Object.assign({}, state, {
        [action.field]: action.value
      })
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

const homePage = (state = true, action) => {
  switch (action.type) {
    case 'INVENTORY':
      return false
    case 'CUSTOMERS':
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

const reducer = combineReducers({customerPage, customerForm, term, inventoryItems, itemForm, homePage, createItem, inventoryPage, searchItems})

const store = createStore(reducer, initialState, applyMiddleware(thunk))

const addItems = (dispatch) => {
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
  })
}

const addCustomer = (dispatch) => {
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
  })
}

const HomePage = () => {
  const {homePage} = store.getState()
  const handleClick = (event) => {
    const value = event.target.getAttribute('name')
    if (value === "inventory") {
      store.dispatch({type: "INVENTORY"})
    } else if (value === "customers") {
      store.dispatch({type: "CUSTOMERS"})
    }
  }
  return (
    !homePage
    ? null
    : <div>
        <div name="inventory" className="main-button" onClick={handleClick}>Inventory</div>
        <div></div>
        <div name="customers" className="main-button" onClick={handleClick}>Customers</div>
      </div>
  )
}
const CreateCustomer = () => {

  return (
    <form id="" >
      <div >
        <label>First Name</label>
        <input name="first-name" type="text" required/>
      </div>
      <div>
        <label>Last Name</label>
        <input name="last-name" type="text"/>
      </div>
      <div>
        <label>Street Address</label>
        <input name="street-address" type="text"/>
      </div>
      <div>
        <label>City</label>
        <input name="city" type="text"/>
      </div>
      <div>
        <label>State</label>
        <input name="state" type="text"/>
      </div>
      <div>
        <label>Zipcode</label>
        <input name="zipcode" type="text"/>
      </div>
      <div>
        <label>Phone Number</label>
        <input name="phone" type="text"/>
      </div>
      <div>
        <label>Email</label>
        <input name="email" type="text"/>
      </div>
      <div>
        <input type="submit" value="Submit Customer"/>
      </div>
    </form>
  )
}

const CustomerPage = () => {
  const {customerPage} = store.getState()
  if (!customerPage) {
    return null
  }
  return (
    <div>
      <div className="main-button">Create Customer</div>
    </div>
  )
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
        <div name="create-item" className="main-button" onClick={handleClick}>Create Item</div>
        <div></div>
        <div name="search-items" className="main-button" onClick={handleClick}>Search Items</div>
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
            <input id="search-inventory-bar" className="prompt" type="text" placeholder="enter description or SKU" onChange={handleChange}/>
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
    store.dispatch(addItems)
  }
  const handleChange = (event) => {
    const value = event.target.value
    const field = event.target.getAttribute('name')
    store.dispatch({type: 'FORM_UPDATED', value, field})
  }
  return (
    !createItem
    ? null
    : <form id="create-item" className="ui form centered grid add-inventory" onSubmit={handleSubmit}>
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
      <div className="home">
        <HomePage/>
        <InventoryPage/>
        <CustomerPage/>
      </div>
      <CreateItem/>
      <SearchItems/>
    </div>,
    document.getElementById('root')
  )
}

store.subscribe(redraw)

redraw()

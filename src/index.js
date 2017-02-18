const React = require('react')
const {render} = require('react-dom')
const {Provider} = require('react-redux')
const {viewUpdated} = require('./actions.js')
const {store} = require('./store.js')
const View = require('./view')

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

const CreateCustomer = () => {
  const {createCustomer} = store.getState()
  const handleSubmit = (event) => {
    event.preventDefault()
    store.dispatch(addCustomer)
  }
  const handleChange = (event) => {
    const value = event.target.value
    const field = event.target.getAttribute('name')
    store.dispatch({type: 'CUSTOMER_FORM_UPDATED', value, field})
  }
  if (!createCustomer) {
    return null
  }
  return (
    <form id="submit-customer" className="ui form grid centered" onSubmit={handleSubmit}>
      <div className="column nine wide centered">
        <div className="field">
          <label>Name</label>
          <div className="two fields">
            <div className="field">
              <input name="firstName" type="text" placeholder="First Name" onChange={handleChange} required/>
            </div>
            <div className="field">
              <input name="lastName" type="text" placeholder="Last Name" onChange={handleChange} required/>
            </div>
          </div>
        </div>
        <div className="field">
          <label>Address</label>
          <input name="streetAddress" type="text" onChange={handleChange} required/>
        </div>
        <div className="fields">
          <div className="eight wide field">
            <label>City</label>
            <input name="city" type="text" onChange={handleChange} required/>
          </div>
          <div className="four wide field">
            <label>State</label>
            <input name="state" type="text" onChange={handleChange} required/>
          </div>
          <div className="four wide field">
            <label>Zipcode</label>
            <input name="zipcode" type="text" onChange={handleChange} required/>
          </div>
        </div>
        <div className="fields">
          <div className="eight wide field">
            <label>Phone Number</label>
            <input name="phone" type="text" onChange={handleChange} required/>
          </div>
          <div className="eight wide field">
            <label>Email</label>
            <input name="email" type="text" onChange={handleChange} required/>
          </div>
        </div>
        <div id="submit-customer-button">
          <input type="submit" value="Submit Customer" className="massive ui positive button"/>
        </div>
      </div>
    </form>
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
      <div id="search-items" className="ui form centered grid">
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

const Header = () => {
  const handleClick = () => store.dispatch(viewUpdated('home'))
  return (
    <div name="homeButton" className="header" onClick={handleClick}>POSHLY</div>
  )
}

render(
  <Provider store={store}>
    <div className="container">
      <Header/>
      <div className='home'>
        <View/>
      </div>
    </div>
  </Provider>,
  document.getElementById('root')
)

const React = require('react')
const {connect} = require('react-redux')
const HomePage = require('./home-page')
const {store} = require('./store')
const {fetchItems} = require('./actions')

const View = ({currentView}) => {
  switch (currentView) {
    case 'inventoryPage':
      return <InventoryPage/>
    case 'customerPage':
      return <CustomerPage/>
    default:
      return <HomePage/>
  }
}

const InventoryPage = () => {
  const handleClick = (event) => {
    const value = event.target.getAttribute('name')
    if (value === 'create-item') {
      store.dispatch({type: 'CREATE_ITEM'})
    } else if (value === 'search-items') {
      store.dispatch(fetchItems)
    }
  }
  return (
      <div>
        <div name="create-item" className="main-button" onClick={handleClick}>Create Item</div>
        <div></div>
        <div name="search-items" className="main-button" onClick={handleClick}>Search Items</div>
      </div>
  )
}

const CustomerPage = () => {
  const handleClick = (event) => {
    const value = event.target.getAttribute('name')
    if (value === 'create-customer') {
      store.dispatch({type: 'CREATE_CUSTOMER'})
    }
  }
  return (
    <div>
      <div name="create-customer" className="main-button" onClick={handleClick}>Create Customer</div>
    </div>
  )
}

const mapStateToProps = ({currentView}) => {
  return {
    currentView
  }
}

module.exports = connect(mapStateToProps)(View)

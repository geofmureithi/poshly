const React = require('react')
const {connect} = require('react-redux')
const {store} = require('./store')
const {fetchItems} = require('./actions')
const HomePage = require('./home-page')
const InventoryPage = require('./inventory-page')
const CreateItem = require('./create-items')

const View = ({currentView}) => {
  switch (currentView) {
    case 'inventoryPage':
      return <InventoryPage/>
    case 'customerPage':
      return <CustomerPage/>
    case 'createItem':
      return <CreateItem/>
    default:
      return <HomePage/>
  }
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

const React = require('react')
const {connect} = require('react-redux')
const CreateCustomer = require('./create-customer')
const CreateItem = require('./create-items')
const CreateSale = require('./create-sale')
const CustomerPage = require('./customer-page')
const InventoryPage = require('./inventory-page')
const HomePage = require('./home-page')
const SalePage = require('./sale-page')
const SearchCustomers = require('./search-customers')
const SearchItems = require('./search-items')

const View = ({currentView}) => {
  switch (currentView) {
    case 'createCustomer':
      return <CreateCustomer/>
    case 'createItem':
      return <CreateItem/>
    case 'createSale':
      return <CreateSale/>
    case 'customerPage':
      return <CustomerPage/>
    case 'inventoryPage':
      return <InventoryPage/>
    case 'salePage':
      return <SalePage/>
    case 'searchCustomers':
      return <SearchCustomers/>
    case 'searchItems':
      return <SearchItems/>
    default:
      return <HomePage/>
  }
}

const mapStateToProps = ({currentView}) => {
  return {
    currentView
  }
}

module.exports = connect(mapStateToProps)(View)

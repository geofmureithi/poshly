const React = require('react')
const {connect} = require('react-redux')
const {viewUpdated} = require('./actions')

const HomePage = ({handleInventoryClick, handleCustomerClick}) => {
  return (
    <div>
      <div className="main-button" onClick={handleInventoryClick}>Inventory</div>
      <div></div>
      <div className="main-button" onClick={handleCustomerClick}>Customers</div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInventoryClick: () => dispatch(viewUpdated('inventoryPage')),
    handleCustomerClick: () => dispatch(viewUpdated('customerPage'))
  }
}

module.exports = connect(null, mapDispatchToProps)(HomePage)

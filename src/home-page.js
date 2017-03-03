const React = require('react')
const {connect} = require('react-redux')
const {viewUpdated} = require('./actions')

const HomePage = ({handleSaleClick, handleInventoryClick, handleCustomerClick}) => {
  return (
    <div>
      <div className="main-button large text" onClick={handleInventoryClick}>Inventory</div>
      <div></div>
      <div className="main-button large text" onClick={handleCustomerClick}>Customers</div>
      <div></div>
      <div className="main-button large text" onClick={handleSaleClick}>Sales</div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSaleClick: () => dispatch(viewUpdated('salePage')),
    handleInventoryClick: () => dispatch(viewUpdated('inventoryPage')),
    handleCustomerClick: () => dispatch(viewUpdated('customerPage'))
  }
}

module.exports = connect(null, mapDispatchToProps)(HomePage)

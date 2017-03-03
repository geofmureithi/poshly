const React = require('react')
const {connect} = require('react-redux')
const {fetchCustomers, viewUpdated} = require('./actions')

const CustomerPage = ({handleCreateCustomerClick, handleSearchCustomerClick}) => {
  return (
    <div>
      <div className="main-button large text" onClick={handleCreateCustomerClick}>Create Customer</div>
      <div></div>
      <div className="main-button large text" onClick={handleSearchCustomerClick}>Search Customers</div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleCreateCustomerClick: () => dispatch(viewUpdated('createCustomer')),
    handleSearchCustomerClick: () => dispatch(fetchCustomers)
  }
}

module.exports = connect(null, mapDispatchToProps)(CustomerPage)

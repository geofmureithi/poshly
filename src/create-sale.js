const React = require('react')
const {connect} = require('react-redux')
const {searchCustomers, searchItems} = require('./actions')

const CreateSale = ({handleSearchCustomersClick, handleSearchCustomerChange, handleSearchItemsClick, handleSelectCustomerClick, invoiceInput, itemInput, matches}) => {
  return (
    <div id="invoice-items" className="ui form centered grid">
      <div className="column fourteen wide">
        <button id="invoice-customer-button" className="large ui button" onClick={handleSearchCustomersClick}>Select Customer</button>
        {
          !invoiceInput
          ? null
          : <div className="ui icon input">
              <input id="invoice-customer-input" className="prompt" type="text" placeholder="enter details, e.g. Name" onChange={handleSearchCustomerChange}/>
              <i className="search icon"></i>
            </div>
        }
        <div id="invoice-customer-scroll">
          <table id="invoice-customer-table" className="ui striped table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Street Address</th>
                <th>City</th>
                <th>State</th>
                <th>Zipcode</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody id="invoice-table-body">
              {matches.map((customer, index) => {
                return (
                  <tr key={index} onClick={handleSelectCustomerClick}>
                    <td>{customer.firstName}</td>
                    <td>{customer.lastName}</td>
                    <td>{customer.streetAddress}</td>
                    <td>{customer.city}</td>
                    <td>{customer.state}</td>
                    <td>{customer.zipcode}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.email}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="column fourteen wide">
        <button id="invoice-item-button" className="large ui button" onClick={handleSearchItemsClick}>Select Product</button>
        {
          !itemInput
          ? null
          : <div className="ui icon input">
              <input id="invoice-customer-input" className="prompt" type="text" placeholder="enter details, e.g. SKU"/>
              <i className="search icon"></i>
            </div>}
        <div id="invoice-item-scroll">
          <table id="invoice-item-table" className="ui striped table">
            <thead>
              <tr>
                <th className="table-number">#</th>
                <th>SKU</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody id="invoice-item-table-body">
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="ui column nine wide centered aligned">
        <input type="submit" value="Submit Sale" id="submit-sale-button" className="massive ui positive button"/>
      </div>
    </div>
  )
}

const mapStateToProps = ({customerCollection, invoiceInput, itemInput, term}) => {
  return {
    invoiceInput,
    itemInput,
    matches: customerCollection.filter(customer => {
      return(
        customer.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
        customer.lastName.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
        customer.streetAddress.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
        customer.city.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
        customer.state.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
        customer.zipcode.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
        customer.phone.replace(/[^0-9#]/, '').indexOf(term.replace(/[^0-9#]/, '')) > -1 ||
        customer.email.toLowerCase().indexOf(term.toLowerCase()) > -1
      )
    })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSearchCustomersClick: () => dispatch(searchCustomers),
    handleSearchItemsClick: () => dispatch(searchItems),
    handleSearchCustomerChange: event => {
      const value = event.target.value
      dispatch({type: 'TERM_UPDATED', value})
    },
    handleSelectCustomerClick: event => {
      const value = event.target
      console.log(value)
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(CreateSale)

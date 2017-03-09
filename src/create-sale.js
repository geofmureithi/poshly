const React = require('react')
const {connect} = require('react-redux')
const {searchCustomers, searchItems} = require('./actions')

const CreateSale = ({customerMatches, handleSearchCustomersClick, handleSearchCustomerChange, handleSearchItemChange, handleSearchItemsClick, handleSelectCustomerClick, invoiceInput, itemInput, itemMatches}) => {
  return (
    <div className="ui medium text form centered grid">
      <div className="column fourteen wide">
        <button className="large ui button" onClick={handleSearchCustomersClick}>Select Customer</button>
        {
          !invoiceInput
          ? null
          : <div id="invoice-input">
              <div id="sale-segment" className="ui medium text segment">
                <div className="field">
                    <label>Search Customers</label>
                    <div className="ui icon input">
                      <input className="prompt" type="text" placeholder="enter keyword, e.g. Last Name" onChange={handleSearchCustomerChange}/>
                      <i className="search icon"></i>
                    </div>
                  </div>
                <div id="invoice-customer-scroll">
                  <table className="ui striped table">
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
                    <tbody>
                      {customerMatches.map((customer, index) => {
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
            </div>
          }

      </div>
      <div className="column fourteen wide">
        <button className="large ui button" onClick={handleSearchItemsClick}>Select Product</button>
        {
          !itemInput
          ? null
          : <div className="ui icon input">
              <input className="prompt" type="text" placeholder="enter details, e.g. SKU" onChange={handleSearchItemChange}/>
              <i className="search icon"></i>
            </div>}
        <div id="invoice-item-scroll">
          <table className="ui striped table">
            <thead>
              <tr>
                <th className="table-number">#</th>
                <th>SKU</th>
                <th>Description</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody id="invoice-item-table-body">
              {itemMatches.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.sku}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                  </tr>
                )
              })}
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

const mapStateToProps = ({customerCollection, inventoryItems, invoiceInput, itemInput, itemTerm, term}) => {
  return {
    invoiceInput,
    itemInput,
    customerMatches: customerCollection.filter(customer => {
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
    }),
    itemMatches: inventoryItems.filter(item => {
      return (
        item.description.toLowerCase().indexOf(itemTerm.toLowerCase()) > -1 ||
        item.sku.indexOf(itemTerm) > -1
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
      const value = event.target.innerHTML
      dispatch({type: 'TERM_UPDATED', value})
      dispatch({type: 'INPUT_CLOSED'})
    },
    handleSearchItemChange: event => {
      const value = event.target.value
      dispatch({type: 'ITEM_TERM_UPDATED', value})
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(CreateSale)

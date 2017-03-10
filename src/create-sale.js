const React = require('react')
const {connect} = require('react-redux')
const {searchCustomers, searchItems} = require('./actions')

const CreateSale = ({
  customerMatches,
  customerSelected,
  handleSearchCustomersClick,
  handleSearchCustomerChange,
  handleSearchItemChange,
  handleSearchItemsClick,
  handleSelectCustomerClick,
  handleSelectItemClick,
  invoiceInput,
  itemInput,
  itemMatches
}) => {
  return (
    <div id="submit-sale" className="ui medium text form centered grid">
      <div className="column thirteen wide">
        <button className="large ui button" onClick={handleSearchCustomersClick}>Select Customer</button>
        <div id="sale-table-scroll">
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
              {
                customerSelected.map((customer, index) => {
                  return(
                  <tr key={index}>
                    <td id={customer.id}>{customer.firstName}</td>
                    <td id={customer.id}>{customer.lastName}</td>
                    <td id={customer.id}>{customer.streetAddress}</td>
                    <td id={customer.id}>{customer.city}</td>
                    <td id={customer.id}>{customer.state}</td>
                    <td id={customer.id}>{customer.zipcode}</td>
                    <td id={customer.id}>{customer.phone}</td>
                    <td id={customer.id}>{customer.email}</td>
                  </tr>
                )})
              }
            </tbody>
          </table>
        </div>
        {
          !invoiceInput
          ? null
          : <div id="customer-invoice-input" className="ui centered grid">
              <div id="customer-invoice-segment" className="column thirteen wide ui medium text segment">
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
                            <td id={customer.id}>{customer.firstName}</td>
                            <td id={customer.id}>{customer.lastName}</td>
                            <td id={customer.id}>{customer.streetAddress}</td>
                            <td id={customer.id}>{customer.city}</td>
                            <td id={customer.id}>{customer.state}</td>
                            <td id={customer.id}>{customer.zipcode}</td>
                            <td id={customer.id}>{customer.phone}</td>
                            <td id={customer.id}>{customer.email}</td>
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
      <div className="column thirteen wide">
        <button className="large ui button" onClick={handleSearchItemsClick}>Select Product</button>
        <table className="ui striped table">
          <thead>
            <tr>
              <th className="table-number">#</th>
              <th>SKU</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        {
          !itemInput
          ? null
          : <div id="item-invoice-input" className="ui centered grid">
              <div id="item-invoice-segment" className="column thirteen wide ui medium text segment">
                <div className="field">
                  <label>Search Items</label>
                  <div className="ui icon input">
                    <input className="prompt" type="text" placeholder="enter keyword, e.g. description" onChange={handleSearchItemChange}/>
                    <i className="search icon"></i>
                  </div>
                </div>
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
                          <tr key={index} onClick={handleSelectItemClick}>
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
            </div>
        }
      </div>
      <div className="ui column nine wide centered aligned">
        <input type="submit" value="Submit Sale" id="submit-sale-button" className="massive ui button"/>
      </div>
    </div>
  )
}

const mapStateToProps = ({
  customerCollection,
  customerId,
  inventoryItems,
  invoiceInput,
  itemInput,
  itemTerm,
  term
}) => {
  return {
    invoiceInput,
    itemInput,
    customerSelected: customerCollection.filter(customer => {
      return (
        customerId == false
        ? null
        : customer.id.includes(customerId)
      )
    }),
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

    handleSearchCustomerChange: event => {
      const value = event.target.value
      dispatch({type: 'TERM_UPDATED', value})
    },
    handleSearchItemChange: event => {
      const value = event.target.value
      dispatch({type: 'ITEM_TERM_UPDATED', value})
    },
    handleSearchItemsClick: () => dispatch(searchItems),

    handleSelectCustomerClick: event => {
      const field = event.target.getAttribute('id')
      dispatch({type: 'CUSTOMER_SELECTED', field})
      dispatch({type: 'INPUT_CLOSED'})
      dispatch({type: 'TERM_CLEARED'})
    },
    handleSelectItemClick: event => {
      const id = event.target.getAttribute('id')
      dispatch({type: 'ITEM_SELECTED', id})
      dispatch({type: 'ITEM_INPUT_CLOSED'})
      dispatch({type: 'TERM_CLEARED'})
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(CreateSale)

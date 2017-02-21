const React = require('react')
const {connect} = require('react-redux')
const {searchCustomers, searchItems} = require('./actions')

const CreateSale = ({handleSearchCustomersClick, handleSearchItemsClick}) => {
  return (
    <div id="invoice-items" className="ui form centered grid">
      <div className="column fourteen wide">
        <button id="invoice-customer-button" className="large ui button" onClick={handleSearchCustomersClick}>Select Customer</button>
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
              <tr>
                <td></td>
                <td></td>
                <td></td>
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
      <div className="column fourteen wide">
        <button id="invoice-item-button" className="large ui button" onClick={handleSearchItemsClick}>Select Product</button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    handleSearchCustomersClick: () => dispatch(searchCustomers),
    handleSearchItemsClick: () => dispatch(searchItems)
  }
}

module.exports = connect(null, mapDispatchToProps)(CreateSale)

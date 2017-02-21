const React = require('react')

const CreateSale = () => {
  return (
    <div id="invoice-items" className="ui form centered grid">
      <div className="column fourteen wide">
        <button className="large ui button">Select Customer</button>
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
      <div className="column fourteen wide">
        <button className="large ui button">Select Product</button>
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
          <tbody id="invoice-item-table-body invoice-table-scroll">
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><span>$</span></td>
                </tr>
          </tbody>
        </table>
      </div>
      <div className="ui column nine wide centered aligned">
        <input type="submit" value="Submit Sale" id="submit-sale-button" className="massive ui positive button"/>
      </div>
    </div>
  )
}

module.exports = CreateSale

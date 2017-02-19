const React = require('react')
const {connect} = require('react-redux')

const SearchCustomers = ({customerCollection}) => {
  return (
    <div id="search-items" className="ui form centered grid">
      <div className="field column nine wide inventory-properties">
        <label className="inventory-property">Search Customers</label>
        <div className="ui icon input">
          <input id="search-customer-bar" className="prompt" type="text" placeholder="enter first or last name"/>
          <i className="search icon"></i>
        </div>
      </div>
      <div id="customer-table-scroll" className="column fourteen wide">
        <table id="customer-table" className="ui striped table">
          <thead>
            <tr>
              <th className="table-number">#</th>
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
          <tbody id="customer-table-body">
            {customerCollection.map((customer, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
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
  )
}

const mapStateToProps = ({customerCollection}) => {
  return {
    customerCollection
  }
}


module.exports = connect(mapStateToProps)(SearchCustomers)

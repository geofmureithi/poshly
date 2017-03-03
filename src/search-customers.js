const React = require('react')
const {connect} = require('react-redux')

const SearchCustomers = ({matches, handleChange}) => {
  return (
    <div id="search-items" className="ui medium text form centered grid">
      <div className="field column nine wide">
        <label>Search Customers</label>
        <div className="ui icon input">
          <input id="search-customer-bar" className="prompt" type="text" placeholder="enter keyword, e.g. Last Name" onChange={handleChange}/>
          <i className="search icon"></i>
        </div>
      </div>
      <div id="customer-table-scroll" className="column fourteen wide">
        <table className="ui striped table">
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
            {matches.map((customer, index) => {
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

const mapStateToProps = ({customerCollection, term}) => {
  return {
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
    handleChange: event => {
      const value = event.target.value
      dispatch({type: 'TERM_UPDATED', value})
    }
  }
}


module.exports = connect(mapStateToProps, mapDispatchToProps)(SearchCustomers)

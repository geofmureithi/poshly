const React = require('react')
const {connect} = require('react-redux')
const {createCustomer} = require('./actions')

const CreateCustomer = ({handleSubmit, handleChange}) => {
  return (
    <form id="submit-customer" className="ui medium text form centered grid" onSubmit={handleSubmit}>
      <div className="column nine wide centered">
        <div className="field">
          <label>Name</label>
          <div className="two fields">
            <div className="field">
              <input name="firstName" type="text" placeholder="First Name" onChange={handleChange} required/>
            </div>
            <div className="field">
              <input name="lastName" type="text" placeholder="Last Name" onChange={handleChange} required/>
            </div>
          </div>
        </div>
        <div className="field">
          <label>Address</label>
          <input name="streetAddress" type="text" onChange={handleChange} required/>
        </div>
        <div className="fields">
          <div className="eight wide field">
            <label>City</label>
            <input name="city" type="text" onChange={handleChange} required/>
          </div>
          <div className="four wide field">
            <label>State</label>
            <input name="state" type="text" onChange={handleChange} required/>
          </div>
          <div className="four wide field">
            <label>Zipcode</label>
            <input name="zipcode" type="text" onChange={handleChange} required/>
          </div>
        </div>
        <div className="fields">
          <div className="eight wide field">
            <label>Phone Number</label>
            <input name="phone" type="text" onChange={handleChange} required/>
          </div>
          <div className="eight wide field">
            <label>Email</label>
            <input name="email" type="text" onChange={handleChange} required/>
          </div>
        </div>
        <div id="submit-customer-button">
          <input type="submit" value="Submit Customer" className="massive ui positive button"/>
        </div>
      </div>
    </form>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: event => {
      event.preventDefault()
      dispatch(createCustomer)
    },
    handleChange: event => {
      const value = event.target.value
      const field = event.target.getAttribute('name')
      dispatch({type: 'CUSTOMER_FORM_UPDATED', value, field})
    }
  }
}

module.exports = connect(null, mapDispatchToProps)(CreateCustomer)

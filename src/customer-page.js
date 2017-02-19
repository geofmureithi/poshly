const React = require('react')
const {connect} = require('react-redux')
const {viewUpdated} = require('./actions')

const CustomerPage = ({handleClick}) => {
  return (
    <div>
      <div className="main-button" onClick={handleClick}>Create Customer</div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: () => dispatch(viewUpdated('createCustomer'))
  }
}

module.exports = connect(null, mapDispatchToProps)(CustomerPage)

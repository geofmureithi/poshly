const React = require('react')
const {connect} = require('react-redux')
const {viewUpdated} = require('./actions')

const SalePage = ({handleCreateSaleClick}) => {
  return (
    <div>
      <div className="main-button large text" onClick={handleCreateSaleClick}>Create Sale</div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleCreateSaleClick: () => dispatch(viewUpdated('createSale'))
  }
}

module.exports = connect(null, mapDispatchToProps)(SalePage)

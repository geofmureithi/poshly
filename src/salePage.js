const React = require('react')
const {connect} = require('react-redux')

const SalePage = ({handleCreateSaleClick}) => {
  return (
    <div>
      <div className="main-button" onClick={handleCreateSaleClick}>Create Sale</div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleCreateSaleClick: () => dispatch()
  }
}

module.exports = connect(null, mapDispatchToProps)(SalePage)

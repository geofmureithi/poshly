const React = require('react')
const {connect} = require('react-redux')
const {fetchItems, viewUpdated} = require('./actions')

const InventoryPage = ({handleCreateItemClick, handleSearchItemsClick}) => {
  return (
    <div>
      <div className="main-button" onClick={handleCreateItemClick}>Create Item</div>
      <div></div>
      <div className="main-button" onClick={handleSearchItemsClick}>Search Items</div>
    </div>
  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleCreateItemClick: () => dispatch(viewUpdated('createItem')),
    handleSearchItemsClick: () => dispatch(fetchItems)
  }
}

module.exports = connect(null, mapDispatchToProps)(InventoryPage)

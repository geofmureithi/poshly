const React = require('react')
const {connect} = require('react-redux')
const {viewUpdated, fetchItems} = require('./actions')

const InventoryPage = ({handleCreateItemClick, handleSearchItemsClick}) => {
  return (
    <div>
      <div name="create-item" className="main-button" onClick={handleCreateItemClick}>Create Item</div>
      <div></div>
      <div name="search-items" className="main-button" onClick={handleSearchItemsClick}>Search Items</div>
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

const React = require('react')
const {connect} = require('react-redux')
const {createItem} = require('./actions')

const CreateItem = ({handleSubmit, handleChange}) => {
  return (
    <form id="create-item" className="ui form centered grid add-inventory" onSubmit={handleSubmit}>
      <div className="field column nine wide inventory-properties">
        <label className="inventory-property">Item SKU</label>
        <input name="sku" type="text" required onChange={handleChange}/>
      </div>
      <div className="field column nine wide inventory-properties">
        <label className="inventory-property">Description</label>
        <input name="description" type="text" required onChange={handleChange}/>
      </div>
      <div className="field column nine wide inventory-properties">
        <label className="inventory-property">Price</label>
        <input name="price"  type="text" required onChange={handleChange}/>
      </div>
      <div className="ui column nine wide centered aligned">
        <input type="submit" value="Submit Item" id="submit-item" className="massive ui positive button"/>
      </div>
    </form>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (event) => {
      event.preventDefault()
      dispatch(createItem)
    },
    handleChange: (event) => {
      const value = event.target.value
      const field = event.target.getAttribute('name')
      dispatch({type: 'FORM_UPDATED', value, field})
    }
  }
}

module.exports = connect(null, mapDispatchToProps)(CreateItem)

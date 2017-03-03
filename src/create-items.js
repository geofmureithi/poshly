const React = require('react')
const {connect} = require('react-redux')
const {createItem} = require('./actions')

const CreateItem = ({handleSubmit, handleChange}) => {
  return (
    <form id="create-item" className="ui medium text form centered grid add-inventory" onSubmit={handleSubmit}>
      <div className="field column nine wide">
        <label>Item SKU</label>
        <input name="sku" type="text" required onChange={handleChange}/>
      </div>
      <div className="field column nine wide">
        <label>Description</label>
        <input name="description" type="text" required onChange={handleChange}/>
      </div>
      <div className="field column nine wide">
        <label>Price</label>
        <input name="price"  type="text" required onChange={handleChange}/>
      </div>
      <div className="ui column nine wide centered aligned">
        <input type="submit" value="Submit Item" className="massive ui positive button"/>
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

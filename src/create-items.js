const React = require('react')
const {connect} = require('react-redux')
const {createItem} = require('./actions')

const CreateItem = ({handleSubmit, handleChange}) => {
  return (
    <form id="create-item" className="ui medium text form centered grid" onSubmit={handleSubmit}>
      <div className="column nine wide centered">
        <div className="field">
          <label>Item SKU</label>
          <input name="sku" type="text" required onChange={handleChange}/>
        </div>
        <div className="field">
          <label>Description</label>
          <input name="description" type="text" required onChange={handleChange}/>
        </div>
        <div className="field">
          <label>Price</label>
          <input name="price"  type="text" required onChange={handleChange}/>
        </div>
        <div className="ui centered aligned grid">
          <input type="submit" value="Submit Item" className="massive ui button"/>
        </div>
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

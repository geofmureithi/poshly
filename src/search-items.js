const React = require('react')
const {connect} = require('react-redux')

const SearchItems = ({matches, handleChange}) => {
  return (
    <div id="search-items" className="ui medium text form centered grid">
      <div className="field column nine wide">
        <label>Search Inventory</label>
        <div className="ui icon input">
          <input id="search-inventory-bar" className="prompt" type="text" placeholder="enter description or SKU" onChange={handleChange}/>
          <i className="search icon"></i>
        </div>
      </div>
      <div id="table-scroll" className="column fourteen wide">
        <table className="ui striped table">
          <thead>
            <tr>
              <th className="table-number">#</th>
              <th>SKU</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {matches.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.sku}</td>
                  <td>{item.description}</td>
                  <td><span>$</span>{item.price}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const mapStateToProps = ({inventoryItems, term}) => {
  return {
    matches: inventoryItems.filter(item => {
      return (
        item.description.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
        item.sku.indexOf(term) > -1
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(SearchItems)

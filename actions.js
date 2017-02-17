const itemsLoaded = (items) => {
  return {type: 'ITEMS_LOADED', items}
}

const fetchItems = (dispatch) => {
  fetch('/inventory-items')
    .then((response) => {
      return response.json()
  }).then((items) => {
    dispatch(itemsLoaded(items))
    dispatch({type: 'SEARCH_ITEMS'})
  })
}

module.exports = {fetchItems}

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

const viewUpdated = (view) => {
  return {type: 'VIEW_UPDATED', view}
}

module.exports = {fetchItems, viewUpdated}

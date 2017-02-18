const {store} = require('./store')

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

const addItems = (dispatch) => {
  const itemForm = store.getState().itemForm
  fetch('/inventory-items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      itemForm
    )
  }).then(() => {
    dispatch({type: 'SUBMIT_ITEM'})
    dispatch(viewUpdated('home'))
  })
}

const viewUpdated = (view) => {
  return {type: 'VIEW_UPDATED', view}
}

module.exports = {fetchItems, addItems, viewUpdated}

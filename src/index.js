const React = require('react')
const {render} = require('react-dom')
const {Provider} = require('react-redux')
const {viewUpdated} = require('./actions.js')
const {store} = require('./store.js')
const View = require('./view')

const Header = () => {
  const handleClick = () => {
    store.dispatch(viewUpdated('home'))
    store.dispatch({type: 'HOME_PAGE'})
  }
  return (
    <div name="homeButton" className="header" onClick={handleClick}>POSHLY</div>
  )
}

render(
  <Provider store={store}>
    <div className="container">
      <Header/>
      <div className='home'>
        <View/>
      </div>
    </div>
  </Provider>,
  document.getElementById('root')
)

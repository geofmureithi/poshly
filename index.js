const React = require('react')
const {render} = require('react-dom')

render(
  <div className="container">
   <div className="header">POSHLY</div>
   <div className="main-buttons">
   <div className="inventory-button">Inventory</div>
   </div>
  </div>,
  document.getElementById('root')
)

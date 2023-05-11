import ReactDOM  from "react-dom"
import "./DrinksMenu.css"

function DrinksMenu(props) {
  return ReactDOM.createPortal(    
    <div className="MenuContainer">{!!props.productsActive && props.children}</div>,
    document.getElementById("menu")
  )
}

export {DrinksMenu}
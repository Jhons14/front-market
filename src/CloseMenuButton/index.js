import "./CloseMenuButton.css"

function CloseMenuButton(props) {
  return (
    <button 
      className="CloseMenuButton"
      onClick = {( )=> props.setProductsActive(false)}
    >X</button>
  )
}

export {CloseMenuButton}
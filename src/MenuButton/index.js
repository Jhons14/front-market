import "./MenuButton.css"

function MenuButton(props) {

  return (
    <button className={`Menu-drinksButton`}
    onClick={()=>props.setProductsActive(prevState=>!prevState)}>
    Menu de bebidas
    </button>
  )
}

export {MenuButton}
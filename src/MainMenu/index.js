import "./MainMenu.css";
function MainMenu(props) {
  if (!props.typeProductActive) {
    return (
      <div className="MainMenu-Container">
        <div className="orders">
          <h1>Pedidos</h1>
        </div>
        {props.onShowMenus()}
      </div>
    );
  }
  if (!!props.error) {
    return props.onError;
  }
}
export { MainMenu };

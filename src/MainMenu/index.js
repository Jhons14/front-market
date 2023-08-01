import "./MainMenu.css";
function MainMenu(props) {
  const onSuccess = () => {
    return (
      <section className="success">
        <div className="orders">
          <h1>Pedidos</h1>
        </div>
        {props.onShowMenus()}
      </section>
    );
  };
  return (
    <div className="MainMenu-Container">
      {!props.error && !props.typeProductActive && onSuccess()}
    </div>
  );
}
export { MainMenu };

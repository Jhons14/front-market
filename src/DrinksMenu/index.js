import ReactDOM from "react-dom";
import "./DrinksMenu.css";

function DrinksMenu(props) {
  return (
    <div className="MenuContainer">
      {!!props.loading && props.onLoading()}
      {!props.loading && !!props.productsActive && props.children}
    </div>
  );
}

export { DrinksMenu };

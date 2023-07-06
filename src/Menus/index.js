import { MenuButton } from "../MenuButton";
import "./Menus.css";

function Menus(props) {
  return (
    <div className="Menus">
      <MenuButton
        setProductsActive={props.setProductsActive}
        setTypeProductActive={props.setTypeProductActive}
        category="Bebidas"
        setLoading={props.setLoading}
      />
      <MenuButton
        setProductsActive={props.setProductsActive}
        setTypeProductActive={props.setTypeProductActive}
        category="Comidas"
        setLoading={props.setLoading}
      />
      <MenuButton
        setProductsActive={props.setProductsActive}
        setTypeProductActive={props.setTypeProductActive}
        category="Postres"
        setLoading={props.setLoading}
      />
    </div>
  );
}

export { Menus };

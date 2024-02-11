import { MenuButton } from '../MenuButton';
import './Menus.css';

function Menus(props) {
  return (
    <div className='Menus'>
      <MenuButton
        setProductsActive={props.setProductsActive}
        setTypeProductActive={props.setTypeProductActive}
        category='bebidas'
        setLoading={props.setLoading}
      />
      <MenuButton
        setProductsActive={props.setProductsActive}
        setTypeProductActive={props.setTypeProductActive}
        category='comidas'
        setLoading={props.setLoading}
      />
      <MenuButton
        setProductsActive={props.setProductsActive}
        setTypeProductActive={props.setTypeProductActive}
        category='postres'
        setLoading={props.setLoading}
      />
    </div>
  );
}

export { Menus };

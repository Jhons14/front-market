import { Children } from 'react';
import { ProductMenu } from '../../Pages/ProductMenu';
import { useProducts } from '../../Utils/useProducts';
function MainMenu(props) {
  return <div className='MainMenu-Container'>{props.onShowMenus()}</div>;
}
export { MainMenu };

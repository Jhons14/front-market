import { Children } from 'react';
import { ProductMenu } from '../../Pages/ProductMenu';
import { useProducts } from '../../Utils/useProducts';
function MainMenu(props) {
  return (
    <div className='MainMenu-Container'>
      {!!props.loading && props.onLoading()}
      {!!props.error && <h1>error</h1>}
      {!props.loading && !props.error && props.onShowMenus()}
    </div>
  );
}
export { MainMenu };

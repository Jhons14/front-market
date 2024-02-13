import { useContext } from 'react';
import { MainContext } from '../../Context';
import { ProductList } from '../../Components/ProductList';
import { ProductBox } from '../../Components/ProductBox';
import { ScreenLoading } from '../../common/ScreenLoading';
import { ScreenError } from '../../common/ScreenError';

import './index.css';

function ProductMenu() {
  const {
    setCartProducts,
    cartProduts,
    error,
    productsActive,
    typeProductActive,
    setTypeProductActive,
    products,
    loading,
  } = useContext(MainContext);

  if (typeProductActive !== location.pathname.substring(1)) {
    setTypeProductActive(location.pathname.substring(1));
  }

  const renderView = () => {
    if (!!error && !loading) {
      return <ScreenError />;
    }
    if (!!loading) {
      return <ScreenLoading />;
    } else {
      return (
        <div className={`product-menu`}>
          <ProductList products={products} productsActive={productsActive}>
            {(product) => (
              <ProductBox
                key={product.productId}
                name={product.name}
                price={product.price}
                setCartProducts={setCartProducts}
              />
            )}
          </ProductList>
        </div>
      );
    }
  };

  return renderView();
}

export { ProductMenu };

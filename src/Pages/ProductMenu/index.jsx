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
    error,
    typeProductActive,
    setTypeProductActive,
    products,
    loading,
  } = useContext(MainContext);

  const renderView = () => {
    if (!!error && !loading) {
      return <ScreenError />;
    } else if (!!loading) {
      return <ScreenLoading />;
    } else if (!error && !loading) {
      return (
        <ProductList products={products}>
          {(product) => (
            <ProductBox
              key={product.productId}
              name={product.name}
              price={product.price}
              setCartProducts={setCartProducts}
            />
          )}
        </ProductList>
      );
    }
  };

  return <div className={`product-menu`}>{renderView()}</div>;
}

export { ProductMenu };

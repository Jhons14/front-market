import { useContext } from 'react';
import { MainContext } from '../../Context';
import { ProductList } from '../../Components/ProductList';
import { ProductBox } from '../../Components/ProductBox';
import { ScreenLoading } from '../../common/ScreenLoading';
import { ScreenError } from '../../common/ScreenError';

import './index.css';

function ProductMenu() {
  const {
    setOrderList,
    orderList,
    error,
    typeProductActive,
    setTypeProductActive,
    products,
    loading,
    tableActive,
  } = useContext(MainContext);
  if (typeProductActive !== location.pathname.substring(1)) {
    setTypeProductActive(location.pathname.substring(1));
  }

  const renderView = () => {
    if (!!error && !loading) {
      return <ScreenError />;
    } else if (!!loading) {
      return <ScreenLoading />;
    } else if (!error && !loading) {
      return (
        <div className={`product-menu-container`}>
          <ProductList products={products} productsActive={productsActive}>
            {(product) => (
              <ProductBox
                key={product.productId}
                productName={product.name}
                price={product.price}
                setOrderList={setOrderList}
                orderList={orderList}
                tableActive={tableActive}
              />
            )}
          </ProductList>
        </div>
      );
    }
  };

  return <div className={`product-menu`}>{renderView()}</div>;
}

export { ProductMenu };

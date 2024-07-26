import { useContext, useEffect } from 'react';
import { MainContext } from '../../Context';
import { ProductList } from '../../Components/ProductList';
import { ProductBox } from '../../Components/ProductBox';
import { ScreenLoading } from '../../common/ScreenLoading';
import { ScreenError } from '../../common/ScreenError';

import './index.css';
import { Modal } from '../../Components/Modal';

function ProductMenu() {
  const {
    setOrderList,
    orderList,
    error,
    productsActive,
    typeProductActive,
    setTypeProductActive,
    productsByCategory,
    loading,
    tableActive,
    authenticate,
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
        <ProductList
          productsByCategory={productsByCategory}
          productsActive={productsActive}
        >
          {(product) => (
            <ProductBox
              key={product.productId}
              product={product}
              setOrderList={setOrderList}
              orderList={orderList}
              tableActive={tableActive}
              typeProductActive={typeProductActive}
              optionList={['amount', 'size', 'edit']}
              authenticate={authenticate}
            />
          )}
        </ProductList>
      );
    }
  };
  return renderView();
}

export { ProductMenu };

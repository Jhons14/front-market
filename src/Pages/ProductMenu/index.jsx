import { useContext, useEffect } from 'react';
import { MainContext } from '../../Context';
import { ProductList } from '../../Components/ProductList';
import { ProductBox } from '../../Components/ProductBox';
import { ScreenLoading } from '../../common/ScreenLoading';
import { ScreenError } from '../../common/ScreenError';
import { getProductsByCategory } from '../../utils';

function ProductMenu() {
  const {
    userLogged,
    setOrderList,
    orderList,
    error,
    setError,
    typeProductActive,
    setTypeProductActive,
    productsByCategory,
    loading,
    setLoading,
    tableActive,
    setTableActive,
    setProductsByCategory,
  } = useContext(MainContext);

  useEffect(() => {
    setTypeProductActive(location.pathname.substring(1));
  }, [location.pathname]);

  useEffect(() => {
    if (!!userLogged && typeProductActive) {
      const fetchProducts = async () => {
        await getProductsByCategory(
          setLoading,
          setError,
          typeProductActive,
          setProductsByCategory
        );
      };
      fetchProducts();
    }
  }, [typeProductActive]);

  const renderView = () => {
    if (!!error && !loading) {
      return <ScreenError error={error} />;
    }
    if (!!loading) {
      return <ScreenLoading />;
    } else {
      return (
        <ProductList productsByCategory={productsByCategory}>
          {(product) => (
            <ProductBox
              key={product.productId}
              product={product}
              setOrderList={setOrderList}
              orderList={orderList}
              tableActive={tableActive}
              typeProductActive={typeProductActive}
              optionList={['amount', 'edit']}
              setTableActive={setTableActive}
            />
          )}
        </ProductList>
      );
    }
  };
  return renderView();
}

export { ProductMenu };

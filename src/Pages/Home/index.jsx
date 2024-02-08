import React from 'react';
import Layout from '../../Components/Layout';
import { ScreenLoading } from '../../common/ScreenLoading';
import { useProducts } from '../../Utils/useProducts';
import { MainMenu } from '../../Components/MainMenu';
import { Menus } from '../../Components/Menus';

function Home(props) {
  const {
    products,
    productsActive,
    setProductsActive,
    typeProductActive,
    setTypeProductActive,
    loading,
    setLoading,
    error,
  } = useProducts();
  console.log(products);

  return (
    <Layout>
      <MainMenu
        products={products}
        error={error}
        typeProductActive={typeProductActive}
        loading={loading}
        onLoading={() => <ScreenLoading />}
        onShowMenus={() => (
          <Menus
            setProductsActive={setProductsActive}
            setTypeProductActive={setTypeProductActive}
            setLoading={setLoading}
          />
        )}
      />
    </Layout>
  );
}
export { Home };

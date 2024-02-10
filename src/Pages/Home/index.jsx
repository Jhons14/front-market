import React from 'react';
import { MainContext } from '../../Context';
import Layout from '../../Components/Layout';
import { ScreenLoading } from '../../common/ScreenLoading';
import { useProducts } from '../../Utils/useProducts';
import { MainMenu } from '../../Components/MainMenu';
import { Menus } from '../../Components/Menus';

function Home(props) {
  const {
    products,
    menuToShow,
    setMenuToShow,
    setProductsActive,
    typeProductActive,
    setTypeProductActive,
    loading,
    setLoading,
    error,
  } = React.useContext(MainContext);
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

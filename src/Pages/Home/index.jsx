import React from 'react';
import { MainContext } from '../../Context';
import Layout from '../../Components/Layout';
import { ScreenLoading } from '../../common/ScreenLoading';
import { useProducts } from '../../Utils/useProducts';
import { MainMenu } from '../../Components/MainMenu';
import { Menus } from '../../Components/Menus';
import './index.css';
import { Link, Outlet, useLocation } from 'react-router-dom';

function Home(props) {
  const location = useLocation();

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
      <div className='home-container'>
        <Menus
          setProductsActive={setProductsActive}
          setTypeProductActive={setTypeProductActive}
          setLoading={setLoading}
        />
        <Outlet />
      </div>
    </Layout>
  );
}
export { Home };

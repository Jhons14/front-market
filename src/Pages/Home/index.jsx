import React from 'react';
import Layout from '../../Components/Layout';
import { MainContext } from '../../Context';
import { Menus } from '../../Components/Menus';

import './index.css';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { BillSection } from '../../Components/BillSection';

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

        <div className='product-menu-container'>
          <Outlet />
        </div>
        <BillSection />
      </div>
    </Layout>
  );
}
export { Home };

import React from 'react';
import { MainContext } from '../../Context';
import Layout from '../../Components/Layout';
import { Menus } from '../../Components/Menus';
import './index.css';
import { Outlet } from 'react-router-dom';
import { OrderSection } from '../OrderSection';
import { NavBar } from '../../Components/NavBar';

function Home() {
  const {
    setError,
    setProductsActive,
    setLoading,
    tableActive,
    setTableActive,
    setOrderList,
    orderList,
  } = React.useContext(MainContext);

  return (
    <div className='home-container'>
      <NavBar />
      <Layout>
        <div className='interface-container'>
          <Menus
            setError={setError}
            setProductsActive={setProductsActive}
            setLoading={setLoading}
          />
          <div className='product-menu-container'>
            <Outlet />
          </div>
          <OrderSection
            tableActive={tableActive}
            setTableActive={setTableActive}
            orderList={orderList}
            setOrderList={setOrderList}
          />
        </div>
      </Layout>
    </div>
  );
}
export { Home };

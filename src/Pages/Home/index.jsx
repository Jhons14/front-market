import React from 'react';
import { MainContext } from '../../Context';
import Layout from '../../Components/Layout';
import { Menus } from '../../Components/Menus';
import './index.css';
import { Outlet } from 'react-router-dom';
import { OrderSection } from '../../Components/OrderSection';
import { NavBar } from '../../Components/NavBar';

function Home() {
  const {
    setError,
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
          <Menus setError={setError} setLoading={setLoading} />
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

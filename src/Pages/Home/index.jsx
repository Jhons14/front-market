import React from 'react';
import { MainContext } from '../../Context';
import Layout from '../../Components/Layout';
import { ScreenLoading } from '../../common/ScreenLoading';
import { Menus } from '../../Components/Menus';
import './index.css';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { OrderSection } from '../OrderSection';

function Home() {
  const {
    setProductsActive,
    setLoading,
    tableActive,
    setTableActive,
    setOrderList,
    orderList,
  } = React.useContext(MainContext);
  return (
    <Layout>
      <div className='home-container'>
        <Menus setProductsActive={setProductsActive} setLoading={setLoading} />
        <div className={`product-menu-container`}>
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
  );
}
export { Home };

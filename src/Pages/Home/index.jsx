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
    setTypeProductActive,
    setLoading,
    tableActive,
    setTableActive,
    orderList,
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
        <OrderSection
          tableActive={tableActive}
          setTableActive={setTableActive}
          orderList={orderList}
        />
      </div>
    </Layout>
  );
}
export { Home };

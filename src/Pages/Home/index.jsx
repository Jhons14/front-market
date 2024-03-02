import React from 'react';
import Layout from '../../Components/Layout';
import { MainContext } from '../../Context';
import { Menus } from '../../Components/Menus';

import './index.css';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { BillSection } from '../../Components/BillSection';

function Home() {
  const {
    setProductsActive,
    setTypeProductActive,
    setLoading,
    setTableActive,
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
        <BillSection setTableActive={setTableActive} />
      </div>
    </Layout>
  );
}
export { Home };

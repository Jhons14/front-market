import { useContext } from 'react';
import Layout from '../../Components/Layout';
import { useLocation } from 'react-router-dom';
import { MainContext } from '../../Context';
import { useNavigate } from 'react-router-dom';
import { ProductList } from '../../Components/ProductList';
import { ProductBox } from '../../Components/ProductBox';
import { ScreenLoading } from '../../common/ScreenLoading';
import { ScreenError } from '../../common/ScreenError';

import './index.css';

function ProductMenu(props) {
  const navigate = useNavigate();

  const {
    typeProductActive,
    setTypeProductActive,
    error,
    productsActive,
    products,
    loading,
  } = useContext(MainContext);

  // setTypeProductActive(location.pathname.substring(1));

  const renderView = () => {
    if (!!loading) {
      return <ScreenLoading />;
    } else {
      return (
        <div className={`product-menu`}>
          <ProductList
            products={products}
            productsActive={productsActive}
          ></ProductList>
        </div>
      );
    }
  };

  return renderView();
}

export { ProductMenu };

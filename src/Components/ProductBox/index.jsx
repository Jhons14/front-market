import { useState, useEffect, useContext } from 'react';
import { ProductDetails } from '../ProductDetails';
import { MainContext } from '../../Context';
import { getProductById, handleAdd } from '../../utils';

import './index.css';

function ProductBox(props) {
  const [product, setProduct] = useState();

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const IMG_URL = `${SERVER_URL}/platzi-market/api/images/products/${product?.img_url}`;

  const [productOptionsData, setProductOptionsData] = useState([
    {
      id: 1,
      name: 'amount',
      value: 0,
    },
    {
      id: 2,
      name: 'upload',
      value: '',
    },
    {
      id: 3,
      name: 'edit',
      value: '',
    },
  ]);

  useEffect(() => {
    if (props.product) {
      setProduct(props.product);
    } else {
      getProductById().then((data) => setProduct(data));
    }
  }, []);

  if (!!product) {
    return (
      <div
        className='product-box'
        onClick={() =>
          handleAdd(
            product,
            productOptionsData,
            setProductOptionsData,
            props.tableActive,
            props.orderList,
            props.setOrderList
          )
        }
      >
        <div className='product-img'>
          <img
            className='product-img'
            src={IMG_URL}
            alt='Imagen del producto obtenida desde el servidor'
          />
        </div>

        <ProductDetails
          product={product}
          productOptionsData={productOptionsData}
          setProductOptionsData={setProductOptionsData}
          optionList={props.optionList}
          typeProductActive={props.typeProductActive}
        />
      </div>
    );
  }
}
export { ProductBox };

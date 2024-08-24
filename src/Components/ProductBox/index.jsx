import { useState, useEffect, useContext } from 'react';
import { ProductDetails } from '../ProductDetails';
import { MainContext } from '../../Context';
import { handleAdd } from '../../utils';

import './index.css';

function ProductBox(props) {
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const { authenticate } = useContext(MainContext);
  const [product, setProduct] = useState();
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
    setProduct(props.product ? props.product : getProductByID());
  }, []);
  const currentURL = window.location.pathname;

  const productIdInURL = currentURL.match(/[^/]+$/)[0];

  async function getProductByID() {
    const parsedToken = await authenticate();
    await fetch(`${SERVER_URL}/platzi-market/api/products/${productIdInURL}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${parsedToken}`,
      },
    })
      .then((data) => (data = data.json()))
      .then((data) => setProduct(data))

      .catch((error) => {
        window.alert(error);
      });
  }

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
        <span className='product-title'>{product.name}</span>
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

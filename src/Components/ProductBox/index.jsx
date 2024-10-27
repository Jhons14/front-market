import { useState, useEffect, useContext } from 'react';
import { ProductDetails } from '../ProductDetails';
import { MainContext } from '../../Context';
import { getProductById, handleAdd } from '../../utils';

import './index.css';

function ProductBox(props) {
  const [product, setProduct] = useState();

  const [productOptionsData, setProductOptionsData] = useState({
    id: 1,
    name: 'amount',
    value: 0,
  });

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

import { useState, useEffect, useContext } from 'react';
import { ProductDetails } from '../ProductDetails';
import './index.css';
import { MainContext } from '../../Context';

import { handleAdd } from '../../utils';

function ProductBox(props) {
  const { authenticate } = useContext(MainContext);
  const [IDIdentator, setIDIdentator] = useState(0);
  const [product, setProduct] = useState(
    props.product ? props.product : getProductByID()
  );
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

  // Ejemplo de uso

  useEffect(() => {
    if (!product) {
      getProductByID();
    }
  }, [product]);

  async function getProductByID() {
    const parsedToken = await authenticate();
    await fetch(
      `http://localhost:2020/platzi-market/api/products/${product?.img_url}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${parsedToken}`,
        },
      }
    )
      .then((data) => (data = data.json()))
      .then((data) => setProduct(data))

      .catch((error) => {
        console.log(error);
      });
  }

  //Funcion para obtener el id del producto que se agregara (El ID, no el index)

  if (!!product) {
    return (
      <div
        className={`product-box`}
        onClick={() =>
          handleAdd(
            product,
            productOptionsData,
            setProductOptionsData,
            props.tableActive,
            props.orderList,
            props.setOrderList,
            IDIdentator,
            setIDIdentator
          )
        }
      >
        <p className='product-title'>{product.name}</p>
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

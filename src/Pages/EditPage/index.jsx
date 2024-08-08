import { useContext } from 'react';
import { Modal } from '../../Components/Modal';
import { MainContext } from '../../Context';
import { ProductBox } from '../../Components/ProductBox';
import { useLocation } from 'react-router-dom';
import './index.css';

function EditPage() {
  const {
    productsByCategory,
    setOrderList,
    orderList,
    tableActive,
    typeProductActive,
  } = useContext(MainContext);

  const currentURL = window.location.pathname;

  const productIdInURL = currentURL.match(/[^/]+$/)[0];

  const product = productsByCategory.find(
    (product) => product?.productId === productIdInURL
  );

  return (
    <Modal>
      <ProductBox
        key={product.productId}
        product={product}
        setOrderList={setOrderList}
        orderList={orderList}
        tableActive={tableActive}
        optionList={['upload']}
        typeProductActive={typeProductActive}
      />
    </Modal>
  );
}

export { EditPage };

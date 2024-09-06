import { useContext } from 'react';
import { Modal } from '../../Components/Modal';
import { MainContext } from '../../Context';
import { ProductBox } from '../../Components/ProductBox';
import { useLocation } from 'react-router-dom';
import './index.css';

function EditPage() {
  const { setOrderList, orderList, tableActive, typeProductActive } =
    useContext(MainContext);

  const currentURL = window.location.pathname;

  const productIdInURL = currentURL.match(/[^/]+$/)[0];

  return (
    <Modal>
      <ProductBox
        key={productIdInURL}
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

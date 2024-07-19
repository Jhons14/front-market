import { useContext } from 'react';
import { Modal } from '../../Components/Modal';
import { MainContext } from '../../Context';
import { ProductBox } from '../../Components/ProductBox';
import { useLocation } from 'react-router-dom';
import './index.css';

function EditPage() {
  const { products, setOrderList, orderList, tableActive, typeProductActive } =
    useContext(MainContext);

  const location = useLocation();
  const productId = location.state.productId;

  const product = products.find((product) => product.productId === productId);
  return (
    <Modal>
      <ProductBox
        key={productId}
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

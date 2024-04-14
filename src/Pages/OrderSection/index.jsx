import { useRef, useState } from 'react';
import cloneDeep from 'lodash.clonedeep';
import './index.css';

function OrderSection({ tableActive, setTableActive, orderList }) {
  const formRef = useRef();
  const [openCreateOrder, setOpenCreateOrder] = useState(false);
  const [mesas, setMesas] = useState([
    {
      id: '1',
      nombreCliente: 'Jhon',
    },
    {
      id: '2',
      nombreCliente: 'Pedro',
    },
    {
      id: '3',
      nombreCliente: '',
    },
    {
      id: '4',
      nombreCliente: '',
    },
  ]);
  const checkInTable = () => {
    const formData = new FormData(formRef.current);
    mesas[tableActive - 1].nombreCliente = formData.get('nombre-cliente');
    setOpenCreateOrder(false);
  };
  const createBill = () => {
    return (
      <form ref={formRef}>
        <p>Nombre del cliente:</p>
        <input type='text' name='nombre-cliente' id='nombre-cliente' />
        <button onClick={() => checkInTable()}>Registrar</button>
      </form>
    );
  };

  const orderActive = cloneDeep(
    orderList.find((listOrder) => listOrder.table === tableActive)
  );
  //Calcula el total a pagar del usuario y lo agrega al estado de la orden activa
  const totalToPay = () => {
    const orderIndexToModify = orderList.findIndex(
      (orderItem) => orderItem === orderActive
    );
    if (!!orderActive) {
      let totalOrderPrice = 0;
      orderActive.products.forEach((product) => {
        totalOrderPrice += product.totalPrice;
      });
      console.log(orderList[orderIndexToModify]);
      orderActive.totalOrderPrice = totalOrderPrice;
      console.log(orderActive);
    }
  };

  const listRender = () => {
    if (!!orderActive) {
      const newOrder = orderActive.products.map((product) => (
        <section className='order-list__products'>
          <span>{product.name}</span>
          <span>{product.quantity}</span>
          <span>{product.price}</span>
          <span>{product.totalPrice}</span>
        </section>
      ));
      return (
        <div className='order-list'>
          <section className='order-list__titles'>
            <span>Product</span>
            <span>Quantity</span>
            <span>Unity price</span>
            <span>Total price</span>
          </section>
          {newOrder}
        </div>
      );
    }
  };
  const renderCheckInOut = () => {
    if (!!tableActive) {
      return (
        <section>
          <p className='order-section-title'>{`Mesa ${tableActive} - ${
            mesas.find((element) => tableActive === element.id).nombreCliente
          }`}</p>
          {!!openCreateOrder && createBill()}
        </section>
      );
    }
  };

  return (
    <div className='order-section-container'>
      {renderCheckInOut()}
      <div className='order-list'>{listRender()}</div>
      {!!tableActive &&
        !mesas[tableActive - 1].nombreCliente &&
        !openCreateOrder && (
          <button onClick={() => setOpenCreateOrder(true)}>
            Check In mesa
          </button>
        )}
      <ul className='table-buttons-container'>
        {mesas.map((mesa) => (
          <li>
            <button
              className='table-button'
              key={mesa.id}
              onClick={() => {
                setTableActive(mesa.id);
                setOpenCreateOrder(false);
              }}
            >
              Mesa {mesa.id}
            </button>
          </li>
        ))}
      </ul>
      {totalToPay()}
    </div>
  );
}
export { OrderSection };

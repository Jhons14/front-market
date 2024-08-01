import { useRef, useState } from 'react';
import { RiWalletFill } from 'react-icons/ri';

import './index.css';

function OrderSection({
  tableActive,
  setTableActive,
  orderList,
  setOrderList,
}) {
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
    },
    {
      id: '4',
    },
    {
      id: '5',
    },
    {
      id: '6',
    },
  ]);
  const renderOrderSectionTitle = () => {
    if (!!tableActive) {
      const clientName = mesas.find(
        (element) => tableActive === element.id
      )?.nombreCliente;
      const renderMesaTitle = () => (
        <span className='order-title_section'>
          <h1>Mesa {tableActive}</h1>
          <span>{clientName ? clientName : 'Sin Registrar'}</span>
        </span>
      );

      if (!!tableActive) {
        return renderMesaTitle();
      }
    }
  };
  const createBill = () => {
    if (!!openCreateOrder) {
      return (
        <form className='register-client-form' ref={formRef}>
          <p>Nombre del cliente:</p>
          <input type='text' name='nombre-cliente' id='nombre-cliente' />
          <button onClick={() => checkInTable()}>Registrar</button>
        </form>
      );
    }
  };

  const checkInTable = () => {
    const formData = new FormData(formRef.current);
    mesas[tableActive - 1].nombreCliente = formData.get('nombre-cliente');
    setOpenCreateOrder(false);
  };

  const orderActive = orderList.find(
    (listItem) => listItem.table === tableActive
  );

  //Calcula el total a pagar del usuario y lo agrega al estado de la orden activa
  const totalToPay = () => {
    if (!!orderActive) {
      let totalToPayValue = 0;
      orderActive.products.forEach((product) => {
        totalToPayValue += product.totalPrice;
      });

      const newOrderListArray = orderList.map((listItem) => {
        if (listItem === orderActive) {
          return { ...listItem, totalToPay: totalToPayValue };
        }
        return listItem;
      });
      if (orderList == !newOrderListArray) {
        setOrderList(newOrderListArray);
      }
      return totalToPayValue;
    }
  };

  const listRender = () => {
    if (!!orderActive) {
      const renderOrderValues = orderActive.products.map((product) => (
        <div className='order-list__item  order-list__product'>
          <div>
            <span>{product.name}</span>
            <span> x{product.quantity}</span>
          </div>
          <span>${product.totalPrice}</span>
        </div>
      ));
      return <div className='order-list'>{renderOrderValues}</div>;
    }
  };

  const fixedHandler = () => (
    <div className='fixedHandler'>
      {/* Rederiza los botones para cambiar entre los distintos menus declarados en el objeto de arriba para cada una de las mesas- 7/30/2024
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
      </ul> */}
      {!!totalToPay() && (
        <p className='total-to-pay__container'>
          <span>Total</span>
          <span> ${totalToPay()}</span>
        </p>
      )}
    </div>
  );

  return (
    <div className='order-section-container'>
      {renderOrderSectionTitle()}
      {createBill()}
      {listRender()}
      {!!tableActive &&
        !mesas[tableActive - 1].nombreCliente &&
        !openCreateOrder && (
          <button onClick={() => setOpenCreateOrder(true)}>
            Check In mesa
          </button>
        )}

      {fixedHandler()}
    </div>
  );
}
export { OrderSection };

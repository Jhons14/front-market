import { useRef, useState } from 'react';
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
    {
      id: '7',
    },
    {
      id: '8',
    },
    {
      id: '9',
    },
    {
      id: '10',
    },
  ]);
  const renderOrderSectionTitle = () => {
    if (!!tableActive) {
      const clientName = mesas.find(
        (element) => tableActive === element.id
      ).nombreCliente;

      const renderMesaTitle = () => (
        <p className='order-section-title'>
          <span>Mesa {tableActive}</span>
          <span>{clientName ? clientName : 'Sin Registrar'}</span>
        </p>
      );

      if (!!tableActive) {
        return (
          <section>
            {renderMesaTitle()}
            {createBill()}
          </section>
        );
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
        <div className='order-list__product'>
          <span>{product.name}</span>
          <span>{product.quantity}</span>
          <span>${product.price}</span>
          <span>${product.totalPrice}</span>
        </div>
      ));
      return (
        <div className='order-list'>
          <section className='order-list__titles'>
            <span>Product</span>
            <span>Quantity</span>
            <span>Unity price</span>
            <span>Total price</span>
          </section>
          <section className='order-list__products-list'>
            {renderOrderValues}
          </section>
          <section className='order-list__total-to-pay'>
            <span>Total to pay</span>
            <span></span>
            <span></span>
            <span> ${totalToPay()}</span>
          </section>
        </div>
      );
    }
  };

  return (
    <div className='order-section-container'>
      {renderOrderSectionTitle()}
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
    </div>
  );
}
export { OrderSection };

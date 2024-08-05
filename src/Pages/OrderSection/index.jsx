import { useEffect, useRef, useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

import './index.css';

function OrderSection({
  tableActive,
  setTableActive,
  orderList,
  setOrderList,
}) {
  const [openCreateOrder, setOpenCreateOrder] = useState(false);
  const scrollListPointer = useState({});

  const [mesas, setMesas] = useState([
    {
      id: '1',
      nombreCliente: 'Jhon',
    },
    {
      id: '2',
    },
  ]);

  function handleScroll(target) {
    const newScrollListPointer = {
      ...scrollListPointer,
      scrollTop: target.scrollTop,
      clientHeight: target.clientHeight,
      scrollHeight: target.scrollHeight,
    };
    updateArrows(newScrollListPointer);
  }

  const upArrow = document.getElementById('scroll-up-list-arrow');
  const downArrow = document.getElementById('scroll-down-list-arrow');

  function updateArrows(scroll) {
    if (scroll.scrollTop === 0) {
      upArrow.style.display = 'none';
    } else {
      upArrow.style.display = 'block';
    }
    if (scroll.scrollHeight - scroll.scrollTop - 10 <= scroll.clientHeight) {
      downArrow.style.display = 'none';
    } else {
      downArrow.style.display = 'block';
    }
  }

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
    const renderOrderValues = orderActive ? (
      orderActive.products.map((product) => (
        <div className='order-list__item '>
          <div>
            <span>{product?.name}</span>
            <span> x{product?.quantity}</span>
          </div>
          <span>${product?.totalPrice}</span>
        </div>
      ))
    ) : (
      <div className='order-list__item '>
        <div>
          <span></span>
          <span> </span>
        </div>
        <span></span>
      </div>
    );
    return (
      <div
        className='order-list-container'
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ height: '20px' }}>
          <IoIosArrowUp
            style={{ width: '100%', height: '100%' }}
            id='scroll-up-list-arrow'
          />
        </div>
        <div
          className='order-list'
          id='order-list'
          onScroll={(e) => handleScroll(e.target)}
        >
          {renderOrderValues}
        </div>
        <div style={{ height: '20px' }}>
          <IoIosArrowDown
            style={{ width: '100%', height: '100%' }}
            id='scroll-down-list-arrow'
          />
        </div>
      </div>
    );
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
      <p className='total-to-pay__container'>
        <span>Total</span>
        <span> ${totalToPay()}</span>
      </p>
    </div>
  );

  return (
    <div className='order-section-container'>
      <div>
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
        {!!totalToPay() && fixedHandler()}
      </div>
    </div>
  );
}
export { OrderSection };

import { useEffect, useRef, useState } from 'react';

import { handleDelete } from '../../utils';

import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import './index.css';
import { CreateBill } from '../CreateBill';

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
      id: 1,
      nombreCliente: 'Jhon',
    },
    {
      id: 2,
    },
  ]);

  const orderActive = orderList.find(
    (listItem) => listItem.table === tableActive
  );

  const clientName = mesas.find(
    (element) => tableActive === element.id
  )?.nombreCliente;

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

  //Calcula el total a pagar del usuario y lo agrega al estado de la orden activa
  const calculateTotalToPay = () => {
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

  //EFFECTS
  useEffect(() => {
    setOpenCreateOrder(false);
  }, [tableActive]);

  //RENDER OBJECTS

  const listRender = () => {
    const renderOrderValues = (products) =>
      products?.map((product) => (
        <div className='order-list__item'>
          <div id='delete-trash-can'>
            <RiDeleteBin6Line
              onClick={() => {
                handleDelete(
                  product.id,
                  orderActive.orderId,
                  orderList,
                  setOrderList
                );
              }}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            {console.log(products)}
            <span>{product?.name}</span>
            <span> x {product?.quantity}</span>
          </div>
          <span>${product?.totalPrice}</span>
        </div>
      ));

    return (
      <div
        className='order-list-container'
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className='arrow-div'>
          <IoIosArrowUp
            style={{ width: '100%', height: '100%', display: 'none' }}
            id='scroll-up-list-arrow'
          />
        </div>
        <div
          className='order-list'
          id='order-list'
          onScroll={(e) => handleScroll(e.target)}
        >
          {renderOrderValues(orderActive?.products)}
        </div>
        <div className='arrow-div'>
          <IoIosArrowDown
            style={{ width: '100%', height: '100%', display: 'none' }}
            id='scroll-down-list-arrow'
          />
        </div>
      </div>
    );
  };

  const fixedHandler = () => {
    if (clientName && !openCreateOrder) {
      return (
        <div className='fixedHandler'>
          <span id='total-to-pay'>
            <p>Total</p>
            <p> ${calculateTotalToPay() || 0}</p>
          </span>
          <button id='buttonToPay'>Go to Pay</button>
        </div>
      );
    }
  };

  function checkInTable(form) {
    const formData = new FormData(form);
    mesas[tableActive - 1].nombreCliente = formData.get('nombre-cliente');
    setOpenCreateOrder(false);
  }
  return (
    <div className='order-section-container'>
      <div>
        {!!tableActive && (
          <span className='order-title_section'>
            <div>
              <span>
                <FaArrowLeft
                  className={`tables-arrow--${tableActive !== 1}`}
                  onClick={() => setTableActive(tableActive - 1)}
                />
              </span>
              <h1>Order {tableActive}</h1>
              <span>
                <FaArrowRight
                  className={`tables-arrow--${tableActive !== mesas.length}`}
                  onClick={() => setTableActive(tableActive + 1)}
                />
              </span>
            </div>
          </span>
        )}
        <CreateBill
          openCreateOrder={openCreateOrder}
          setOpenCreateOrder={setOpenCreateOrder}
          checkInTable={checkInTable}
        />
        {!openCreateOrder && (
          <span>{clientName ? clientName : 'Sin Registrar'}</span>
        )}
        {listRender()}

        {!clientName && !openCreateOrder && (
          <button id='checkIn-button' onClick={() => setOpenCreateOrder(true)}>
            New Order
          </button>
        )}
        {fixedHandler()}
      </div>
    </div>
  );
}
export { OrderSection };

import { useRef, useState } from 'react';

function OrderSection({ tableActive, setTableActive, orderList, children }) {
  console.log(children);
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
        <p>Nombre del cliente</p>
        <input type='text' name='nombre-cliente' id='nombre-cliente' />
        <button onClick={() => checkInTable()}>Registrar</button>
      </form>
    );
  };
  const listRender = () => {
    if (!!orderList[tableActive - 1]) {
      console.log(orderList[tableActive - 1].products);
      tableActive && orderList[tableActive - 1].products.map(<div>holi</div>);
    }
    return;
  };
  return (
    <div className='order-section-container'>
      {!!tableActive && (
        <section>
          <p className='order-section-title'>{`Mesa ${tableActive} - ${
            mesas.find((element) => tableActive === element.id).nombreCliente
          }`}</p>
          {!tableActive.nombreCliente && (
            <button onClick={() => setOpenCreateOrder(true)}>
              Registrar cuenta en mesa
            </button>
          )}
        </section>
      )}
      <section>{!!openCreateOrder && createBill()}</section>
      <div className='tablesList'>
        <ul>
          <li>
            {mesas.map((mesa) => (
              <button key={mesa.id} onClick={() => setTableActive(mesa.id)}>
                Mesa {mesa.id}
              </button>
            ))}
          </li>
        </ul>
        <div className='productTableList'>
          <section>{listRender()}</section>
        </div>
      </div>
    </div>
  );
}
export { OrderSection };

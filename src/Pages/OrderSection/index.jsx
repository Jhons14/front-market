import { useRef, useState } from 'react';

function OrderSection({ tableActive, setTableActive, orderList }) {
  console.log(orderList);
  const formRef = useRef();
  const [openCreateTableBill, setOpenCreateBill] = useState(false);
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
    console.log(tableActive);
    mesas[tableActive.id - 1].nombreCliente = formData.get('nombre-cliente');
    setOpenCreateBill(false);
  };
  const createBill = () => {
    return (
      <form ref={formRef}>
        <p>Nombre del cliente</p>
        <input type='text' name='nombre-cliente' id='nombre-cliente' />
        <button type='button' onClick={() => checkInTable()}>
          Registrar
        </button>
      </form>
    );
  };
  return (
    <div className='bill-section-container'>
      {!!tableActive && (
        <section>
          <p className='bill-section-title'>{`Mesa ${tableActive} - ${
            mesas.find((element) => tableActive === element.id).nombreCliente
          }`}</p>
          {!tableActive.nombreCliente && (
            <button onClick={() => setOpenCreateBill(true)}>
              Registrar cuenta en mesa
            </button>
          )}
        </section>
      )}
      <section>{!!openCreateTableBill && createBill()}</section>
      <div>
        <ul>
          <li>
            {mesas.map((mesa) => (
              <button key={mesa.id} onClick={() => setTableActive(mesa.id)}>
                Mesa {mesa.id}
              </button>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
}
export { OrderSection };

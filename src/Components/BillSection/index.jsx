import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function BillSection() {
  const formRef = useRef();
  const [billTableActive, setBillTableActive] = useState('');
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
    mesas[billTableActive.id - 1].nombreCliente =
      formData.get('nombre-cliente');
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
      {!!billTableActive && (
        <section>
          <p className='bill-section-title'>{`Mesa ${billTableActive.id} - ${
            mesas?.find((element) => billTableActive.id === element.id)
              .nombreCliente
          }`}</p>
          {!billTableActive.nombreCliente && (
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
            {mesas.map((element) => (
              <button
                key={element.id}
                onClick={() => setBillTableActive(element)}
              >
                Mesa {element.id}
              </button>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
}
export { BillSection };

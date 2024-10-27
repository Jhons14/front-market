import { useRef } from 'react';
import './index.css';
export function CreateBill(props) {
  const formRef = useRef();

  if (!!props.openCreateOrder) {
    return (
      <form className='register-client-form' ref={formRef}>
        <h2>Nombre del cliente:</h2>
        <input type='text' name='nombre-cliente' id='nombre-cliente' />
        <button
          type='button'
          onClick={() => props.checkInTable(formRef.current)}
        >
          Registrar
        </button>
      </form>
    );
  }
}

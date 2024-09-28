import { useRef } from 'react';

export function CreateBill(props) {
  const formRef = useRef();

  if (!!props.openCreateOrder) {
    return (
      <form className='register-client-form' ref={formRef}>
        <p>Nombre del cliente:</p>
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

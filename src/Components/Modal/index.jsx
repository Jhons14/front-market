import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

import './index.css';

function Modal({ children, closeModal }) {
  const navigate = useNavigate();
  return ReactDOM.createPortal(
    <div className='Modal-container'>
      <span className='CloseModal-button' onClick={() => navigate(-1)}>
        X
      </span>
      {children}
    </div>,
    document.getElementById('modal')
  );
}

export { Modal };

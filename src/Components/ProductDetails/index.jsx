import React from 'react';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';

import './index.css';

function ProductDetails({
  productOptionsData,
  setProductOptionsData,
  product,
}) {
  const handleOption = (event, payload) => {
    event.stopPropagation();
    // Crea una copia del objeto con la actualización
    let newProductOptionsData = {
      ...productOptionsData, // copia las propiedades anteriores
      value:
        payload === 'plus'
          ? productOptionsData.value + 1
          : Math.max(0, productOptionsData.value - 1), // evita valores negativos
    };

    setProductOptionsData(newProductOptionsData);
  };

  function renderOption() {
    return (
      <div
        key={productOptionsData.name}
        className='buttons-container amount-buttons-container'
      >
        <div>
          <CiSquareMinus
            size={32}
            height='4em'
            onClick={(e) => handleOption(e, 'subtrack')}
            className='option-button amount-button'
            src='src\assets\minus.svg'
            alt='substrack'
          />
        </div>

        <div>
          <span id='amount-counter'>{productOptionsData.value}</span>
        </div>

        <div>
          <CiSquarePlus
            size={32}
            className='option-button amount-button'
            onClick={(e) => handleOption(e, 'plus')}
            alt='plus'
          />
        </div>
      </div>
    );
  }

  const renderOptionList = () => (
    <div id='product-details-container'>
      <span className='product-title'>{product.name}</span>

      <div className='options-container'>{renderOption()}</div>
    </div>
  );

  return renderOptionList();
}
export { ProductDetails };

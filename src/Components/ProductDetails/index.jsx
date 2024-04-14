import React from 'react';
import { useState } from 'react';
import './index.css';

function ProductDetails({ productOptionsData, setProductOptionsData }) {
  const sizesToShow = ['Small', 'Medium', 'Largue'];
  const setClickedSize = (size) => {
    const newProductOptionsData = [...productOptionsData];
    console.log(size);
    newProductOptionsData[1].value = size;
    setProductOptionsData(newProductOptionsData);
    console.log(newProductOptionsData);
    console.log(productOptionsData);
  };

  const handleOption = (event, option, payload) => {
    const optionIndex = productOptionsData.findIndex(
      (add) => add.id === option.id
    );
    let newProductOptionsData = [...productOptionsData];
    const amountOption = () => {
      if (payload === 'plus') {
        newProductOptionsData[optionIndex].value += 1;
        setProductOptionsData(newProductOptionsData);
      } else {
        if (newProductOptionsData[optionIndex].value > 0) {
          newProductOptionsData[optionIndex].value -= 1;
          setProductOptionsData(newProductOptionsData);
        }
      }
    };

    const sizeOption = () => {
      newProductOptionsData[optionIndex].value = 'large';
      setProductOptionsData(newProductOptionsData);
    };

    switch (event) {
      case 'amount':
        switch (optionIndex) {
          case 0:
            amountOption();
            break;
          case 1:
            sizeOption();
            break;
        }
      default:
        break;
    }
  };

  const renderOption = (optionType, productOption) => {
    switch (optionType) {
      case 'amount':
        return (
          <div className='product-option amount-option'>
            <span>{productOption.name}</span>
            <section className='buttons-container amount-buttons-container'>
              <div>
                <img
                  onClick={() =>
                    handleOption(optionType, productOption, 'subtrack')
                  }
                  className='option-button amount-button'
                  src='src\assets\minus.svg'
                ></img>
              </div>

              <div>
                <span className='amount-button amount-counter'>
                  {productOption.value}
                </span>
              </div>

              <div>
                <img
                  className='option-button amount-button'
                  src='src\assets\add.svg'
                  onClick={() =>
                    handleOption(optionType, productOption, 'plus')
                  }
                ></img>
              </div>
            </section>
          </div>
        );

      case 'size':
        return (
          <div className='product-option size-option'>
            <span>{productOption.name}</span>
            <section className='buttons-container size-buttons-container'>
              {sizesToShow.map((value) => (
                <div>
                  <span
                    className='option-button size-button'
                    onClick={() => setClickedSize(value)}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </section>
          </div>
        );
    }
  };

  const renderOptionList = () => (
    <div className='options-container'>
      {renderOption('amount', productOptionsData[0])}
      {renderOption('size', productOptionsData[1])}
    </div>
  );
  return renderOptionList();
}
export { ProductDetails };

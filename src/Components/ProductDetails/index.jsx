import React from 'react';
import { useState } from 'react';
import './index.css';

function ProductDetails({ productOptionsData, setProductOptionsData }) {
  const sizesToShow = ['Small', 'Medium', 'Largue'];
  const setClickedSize = (size) => {
    const newProductOptionsData = [...productOptionsData];
    newProductOptionsData[1].value = size;
    setProductOptionsData(newProductOptionsData);
  };

  const handleOption = (option, payload) => {
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

    switch (optionIndex) {
      case 0:
        amountOption();
        break;
      case 1:
        sizeOption();
        break;
    }
  };
  function uploadImg() {
    var formData = new FormData();
    var fileInput = document.getElementById('fileInput');
    formData.append('file', fileInput.files[0]);

    fetch('http://localhost:2020/platzi-market/api/files/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const renderOption = (productOption) => {
    switch (productOption.name) {
      case 'amount':
        return (
          <div className='product-option amount-option'>
            <span>{productOption.name}</span>
            <section className='buttons-container amount-buttons-container'>
              <div>
                <img
                  onClick={() => handleOption(productOption, 'subtrack')}
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
                  onClick={() => handleOption(productOption, 'plus')}
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
      {renderOption(productOptionsData[0])}
      {renderOption(productOptionsData[1])}
    </div>
  );

  return (
    <>
      {renderOptionList()}
      <>
        <div className='product-option size-option'>
          <span>Upload</span>
          <section className='buttons-container size-buttons-container'>
            <form id='uploadForm' enctype='multipart/form-data'>
              <input type='file' name='file' id='fileInput' />
              <button type='button' onClick={() => uploadImg()}>
                Upload
              </button>
            </form>
          </section>
        </div>
      </>
    </>
  );
}
export { ProductDetails };

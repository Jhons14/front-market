import React, { useState } from 'react';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';

import './index.css';
import { useNavigate } from 'react-router-dom';
import { uploadImg } from '../../utils';

function ProductDetails({ product, amountCounter, setAmountCounter }) {
  const navigate = useNavigate();

  const renderOption = (productOption) => {
    switch (productOption.name) {
      case 'edit':
        return (
          <div className='product-option size-option'>
            <section className='buttons-container size-buttons-container'>
              <button
                type='button'
                onClick={() => navigate(`/product/edit/${product.productId}`)}
              >
                Edit
              </button>
            </section>
          </div>
        );
      case 'upload':
        return (
          <form
            id='uploadForm'
            enctype='multipart/form-data'
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <span>Upload</span>
            <input type='file' name='file' id={`fileInput`} />
            <button type='button' onClick={() => uploadImg()}>
              Upload
            </button>
          </form>
        );
    }
  };

  function handleAmount(e, action) {
    e.stopPropagation();

    switch (action) {
      case 'add':
        setAmountCounter(amountCounter + 1);
        break;
      case 'remove':
        if (amountCounter > 0) {
          setAmountCounter(amountCounter - 1);
        }
        break;
    }
  }

  const renderOptionList = () => (
    <div id='product-details-container'>
      <span className='product-title'>{product.name}</span>
      <div className='options-container'>
        <div className='buttons-container amount-buttons-container'>
          <div>
            <CiSquareMinus
              size={32}
              height='4em'
              onClick={(e) => handleAmount(e, 'remove')}
              className='option-button amount-button'
              src='src\assets\minus.svg'
              alt='substrack'
            />
          </div>

          <div>
            <span id='amount-counter'>{amountCounter}</span>
          </div>

          <div>
            <CiSquarePlus
              size={32}
              className='option-button amount-button'
              onClick={(e) => handleAmount(e, 'add')}
              alt='plus'
            />
          </div>
        </div>
      </div>
    </div>
  );

  return renderOptionList();
}
export { ProductDetails };

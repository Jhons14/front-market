import React from 'react';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';

import './index.css';
import { useNavigate } from 'react-router-dom';
import { uploadImg } from '../../utils';

function ProductDetails({
  optionList,
  productOptionsData,
  setProductOptionsData,
  product,
}) {
  const navigate = useNavigate();
  const sizesToShow = ['Small', 'Medium', 'Largue'];

  const setClickedSize = (size) => {
    const newProductOptionsData = [...productOptionsData];
    newProductOptionsData[1].value = size;
    setProductOptionsData(newProductOptionsData);
  };

  const handleOption = (event, option, payload) => {
    event.stopPropagation();
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

  const renderOption = (productOption) => {
    switch (productOption.name) {
      case 'amount':
        return (
          <div className='buttons-container amount-buttons-container'>
            <div>
              <CiSquareMinus
                size={32}
                height='4em'
                onClick={(e) => handleOption(e, productOption, 'subtrack')}
                className='option-button amount-button'
                src='src\assets\minus.svg'
                alt='substrack'
              />
            </div>

            <div>
              <span id='amount-counter'>{productOption.value}</span>
            </div>

            <div>
              <CiSquarePlus
                size={32}
                className='option-button amount-button'
                onClick={(e) => handleOption(e, productOption, 'plus')}
                alt='plus'
              />
            </div>
          </div>
        );

      case 'size':
        return (
          <section>
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
        );

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
  const findOptionByName = (optionName) =>
    productOptionsData.find((option) => option.name === optionName);

  const renderOptionList = () => (
    <div id='product-details-container'>
      <span className='product-title'>{product.name}</span>

      <div className='options-container'>
        {optionList.map((option) => renderOption(findOptionByName(option)))}
      </div>
    </div>
  );

  return renderOptionList();
}
export { ProductDetails };

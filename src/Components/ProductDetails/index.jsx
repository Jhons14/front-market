import React from 'react';
import { useState } from 'react';
import './index.css';
import { useNavigate, Link } from 'react-router-dom';

function ProductDetails({
  optionList,
  productOptionsData,
  setProductOptionsData,
  product,
  typeProductActive,
}) {
  const AUTHENTICATION_URL =
    'http://localhost:2020/platzi-market/api/auth/authenticate';

  const UPLOAD_PRODUCTIMG_URL =
    'http://localhost:2020/platzi-market/api/files/upload/image/product/';

  const UPDATE_PRODUCT_URL =
    'http://localhost:2020/platzi-market/api/products/update/';

  const navigate = useNavigate();
  const sizesToShow = ['Small', 'Medium', 'Largue'];

  const credentials = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'jhon',
      password: 'Platzi#14',
    }),
  };

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

  async function authenticate() {
    const parsedToken = await fetch(AUTHENTICATION_URL, credentials)
      .then((res) => res.json().then((res) => res.jwt))
      .catch((error) => {
        onSetError(error);
      });
    return parsedToken;
  }

  async function uploadImg() {
    const parsedToken = await authenticate();
    var formData = new FormData();
    var fileInput = document.getElementById(`fileInput${product.productId}`);

    formData.append('file', fileInput.files[0]);

    fetch(`${UPLOAD_PRODUCTIMG_URL + product.productId}`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${parsedToken}`,
      },
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    const productBody = { img_url: fileInput.files[0].name };
    console.log(productBody);

    fetch(`${UPDATE_PRODUCT_URL + product.productId}`, {
      method: 'POST',
      body: JSON.stringify(productBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${parsedToken}`,
      },
    }).finally(window.location.replace(`/${typeProductActive}`));
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
                  alt='substrack'
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
                  alt='plus'
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

      case 'edit':
        return (
          <div className='product-option size-option'>
            <span>Edit</span>
            <section className='buttons-container size-buttons-container'>
              <button
                type='button'
                onClick={() =>
                  navigate(`/product/edit`, {
                    state: { productId: product.productId },
                  })
                }
              >
                Edit
              </button>
            </section>
          </div>
        );
      case 'upload':
        return (
          <div className='product-option size-option'>
            <span>Upload</span>
            <section className='buttons-container size-buttons-container'>
              <form id='uploadForm' enctype='multipart/form-data'>
                <input
                  type='file'
                  name='file'
                  id={`fileInput${product.productId}`}
                />
                <button type='button' onClick={() => uploadImg()}>
                  Upload
                </button>
              </form>
            </section>
          </div>
        );
    }
  };
  const findOptionByName = (optionName) =>
    productOptionsData.find((option) => option.name === optionName);

  const renderOptionList = () => (
    <div className='options-container'>
      {optionList.map((option) => renderOption(findOptionByName(option)))}
    </div>
  );

  return renderOptionList();
}
export { ProductDetails };

import React from 'react';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';

import './index.css';
import { useNavigate } from 'react-router-dom';

function ProductDetails({
  optionList,
  productOptionsData,
  setProductOptionsData,
  product,
  typeProductActive,
}) {
  const AUTHENTICATION_URL =
    'https://server-market-production.up.railway.app/platzi-market/api/auth/authenticate';

  const UPLOAD_PRODUCTIMG_URL =
    'https://server-market-production.up.railway.app/platzi-market/api/files/upload/image/product/';

  const UPDATE_PRODUCT_URL =
    'https://server-market-production.up.railway.app/platzi-market/api/products/update/';

  const IMG_URL = `https://server-market-production.up.railway.app/platzi-market/api/images/products/${product.img_url}`;

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

  async function authenticate() {
    const parsedToken = await fetch(AUTHENTICATION_URL, credentials)
      .then((res) => res.json().then((res) => res.jwt))
      .catch((error) => {
        onSetError(error);
      });
    return parsedToken;
  }

  async function uploadImg() {
    console.log('gonorrea');

    const parsedToken = await authenticate();
    var formData = new FormData();
    var fileInput = document.getElementById(`fileInput`);

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

    fetch(`${UPDATE_PRODUCT_URL + product.productId}`, {
      method: 'POST',
      body: JSON.stringify(productBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${parsedToken}`,
      },
    }).then((res) => console.log(res));
    // .finally(window.location.replace(`/${typeProductActive}`));
  }

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
    <div
      style={{
        display: 'flex',
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      <img
        src={IMG_URL}
        className='product-img'
        alt='Imagen asociada al producto en el servidor'
      ></img>
      <div className='options-container'>
        {optionList.map((option) => renderOption(findOptionByName(option)))}
      </div>
    </div>
  );

  return renderOptionList();
}
export { ProductDetails };

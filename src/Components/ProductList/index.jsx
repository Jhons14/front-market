import React from 'react';
import './index.css';
import { ProductBox } from '../ProductBox';

const ProductList = (props) => {
  console.log(props.products);
  return (
    <div className='product-list'>{props.products.map(props.children)}</div>
  );
};

export { ProductList };

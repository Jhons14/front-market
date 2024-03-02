import React from 'react';
import './index.css';
import { ProductBox } from '../ProductBox';

const ProductList = (props) => {
  return (
    <div className='product-list'>{props.products.map(props.children)}</div>
  );
};

export { ProductList };

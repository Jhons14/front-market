import React from 'react';
import './index.css';
import { ProductBox } from '../ProductBox';

const ProductList = ({ children, products }) => {
  return <div className='product-list'>{products.map(children)}</div>;
};

export { ProductList };

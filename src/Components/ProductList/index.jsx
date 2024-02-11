import React from 'react';
import './index.css';
import { ProductBox } from '../ProductBox';

function ProductList({ products }) {
  const renderView = () =>
    products.map((product) => (
      <ProductBox
        key={product.productId}
        name={product.name}
        price={product.price}
      />
    ));
  return renderView();
}

export { ProductList };

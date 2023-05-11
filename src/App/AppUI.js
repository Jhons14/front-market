import React from "react";
import { useProducts } from "./useProducts";
import { ProductList } from "../ProductList";
import { ProductItem } from "../ProductItem";
import { DrinksMenu } from "../DrinksMenu";
import { Title } from "../Title";
import { MenuButton } from "../MenuButton";
import {CloseMenuButton} from "../CloseMenuButton"

function AppUI() {

  const {
    products,
    getProducts,
    productsActive,
    setProductsActive
  } = useProducts();
  return (
  <React.Fragment>   
    {!productsActive && <MenuButton
      productsActive = {productsActive}
      setProductsActive = {setProductsActive}
    />}

    <DrinksMenu
    productsActive = {productsActive}
    >     
    <CloseMenuButton
      productsActive = {productsActive}
      setProductsActive = {setProductsActive}
    />       
      <Title/>     
      <ProductList
        getProducts = {getProducts}
        products = {products}
        productsActive = {productsActive}
      >
        {product=>(
            <ProductItem
              key = {product.productId}
              name = {product.name}
              price = {product.price}
              id = {product.id}            
            />
          )   
        }
      </ProductList> 
    </DrinksMenu>
  </React.Fragment>
  )
}
export {AppUI};
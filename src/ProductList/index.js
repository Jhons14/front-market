import React from "react";
import "./index.css"

function ProductList(props){
  props.getProducts();
  
 return( 
  <ul className="ProductList">  
    {props.products.map(props.children)}
  </ul>
 )
}

export {ProductList};
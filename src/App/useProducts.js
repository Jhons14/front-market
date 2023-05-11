
import React from "react";

function useProducts(){
    
    const [products, setProducts]= React.useState([""]);    
    const [productsActive, setProductsActive] = React.useState(false);
    const authAPI = "http://localhost:2020/platzi-market/api/auth/authenticate"
    const getAllProdAPI = "http://localhost:2020/platzi-market/api/products/all";
  

    const credentials={
      method: "POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        "username" : "jhon",
        "password" : "Platzi#14"
      })
      };

    
      
    async function getProducts(){     
      const responseAuth = await fetch(authAPI, credentials);
      const token = await responseAuth.json();
      const parsedToken = token.jwt;

      const response = await fetch(getAllProdAPI, {
        method: "GET",
        headers: {
          "Authorization":`Bearer ${parsedToken}`,
        }
      });
      const data = await response.json();
      setProducts (data);  
    }

  return ({      
    getProducts,
    products,
    productsActive,
    setProductsActive
  }
  )
}

export {useProducts};
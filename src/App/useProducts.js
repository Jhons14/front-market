import React from "react";

function useProducts() {
  const [products, setProducts] = React.useState([""]);
  const [productsActive, setProductsActive] = React.useState(false);
  const [typeProductActive, setTypeProductActive] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const authAPI = "http://localhost:2020/platzi-market/api/auth/authenticate";
  const getAllProdAPI = "http://localhost:2020/platzi-market/api/products/all";

  React.useEffect(() => {
    setTimeout(() => {
      const chooseCategory = () => {
        let categoryActive = "";
        if (typeProductActive === "Bebidas") {
          categoryActive = 5;
        } else if (typeProductActive === "Comidas") {
          categoryActive = 2;
        } else if (typeProductActive === "Postres") {
          categoryActive = 3;
        }
        return categoryActive;
      };

      const getProductByCategoryURL = `http://localhost:2020/platzi-market/api/products/category/${chooseCategory()}`;

      async function getProducts() {
        const credentials = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "jhon",
            password: "Platzi#14",
          }),
        };
        const parsedToken = await fetch(authAPI, credentials)
          .then((res) => res.json().then((res) => res.jwt))
          .catch((error) => {
            setError(error);
          });
        await fetch(getProductByCategoryURL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${parsedToken}`,
          },
        })
          .then((data) => (data = data.json()))
          .then((data) => {
            setProducts(data);
          })
          .catch((error) => {
            setError(error);
          });
        setProductsActive(true);
        setLoading(false);
      }

      if (typeProductActive) {
        try {
          getProducts();
        } catch (error) {
          setError(error);
          console.log(error);
        }
      }
    }, 1000);
  }, [typeProductActive]);

  return {
    products,
    productsActive,
    setProductsActive,
    typeProductActive,
    setTypeProductActive,
    loading,
    setLoading,
    error,
  };
}

export { useProducts };

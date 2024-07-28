const GET_ALL_PRODUCTS = `http://localhost:2020/platzi-market/api/products/all`;

async function getAllProducts() {
  const parsedToken = await authenticate();
  await fetch(GET_ALL_PRODUCTS, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${parsedToken}`,
    },
  })
    .then((data) => (data = data.json()))
    .then((data) => setProducts(data))
    .catch((error) => {
      onSetError(error);
    });
}

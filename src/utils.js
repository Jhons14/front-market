const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const AUTHENTICATION_URL = `${SERVER_URL}/platzi-market/api/auth/authenticate`;

//PRODUCTS URL
const GET_ALL_PRODUCTS_URL = `${SERVER_URL}/platzi-market/api/products/all`;
const UPLOAD_PRODUCTIMG_URL = `${SERVER_URL}/platzi-market/api/files/upload/image/product/`;
const UPDATE_PRODUCT_URL = `${SERVER_URL}/platzi-market/api/products/update/`;

//CATEGORIES URL
const GET_ALL_CATEGORIES_URL = `${SERVER_URL}/platzi-market/api/category/all`;

//SIGN IN
async function signIn(username, password) {
  const credentials = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  };
  const parsedToken = await fetch(AUTHENTICATION_URL, credentials)
    .then((res) => res.json())
    .then((res) => res.jwt);

  if (!!parsedToken) {
    sessionStorage.setItem('token', parsedToken);
  }
}

//SIGN OUT
function signOut() {
  sessionStorage.removeItem('token');
  window.location.reload();
}

//GET ALL PRODUCTS
async function getAllProducts() {
  const parsedToken = sessionStorage.getItem('token');

  return await fetch(GET_ALL_PRODUCTS_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${parsedToken}`,
    },
  })
    .then((data) => (data = data.json()))
    .catch((error) => {
      window.alert(error);
    });
}

//GET PRODUCTS BY CATEGORY
async function getProductsByCategory(setProductsActive, setLoading, setError) {
  const CATEGORY_ID = window.location.pathname.substring(
    window.location.pathname.lastIndexOf('/') + 1
  );
  const GET_PRODUCTS_BY_CATEGORY_URL = `${SERVER_URL}/platzi-market/api/products/category/${CATEGORY_ID}`;
  const parsedToken = sessionStorage.getItem('token');
  const products = await fetch(GET_PRODUCTS_BY_CATEGORY_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${parsedToken}`,
    },
  })
    .then((data) => (data = data.json()))
    .catch((error) => {
      setError(error);
    });

  setLoading(false);
  setProductsActive();
  return products;
}

//GET PRODUCT BY ID
async function getProductById() {
  const currentURL = window.location.pathname;
  const productIdInURL = currentURL.match(/[^/]+$/)[0];
  const GET_PRODUCT_BY_ID_URL = `${SERVER_URL}/platzi-market/api/products/${productIdInURL}`;
  const parsedToken = sessionStorage.getItem('token');
  const product = await fetch(GET_PRODUCT_BY_ID_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${parsedToken}`,
    },
  })
    .then((data) => (data = data.json()))
    .catch((error) => {
      window.alert(error);
    });
  return product;
}

//UPLOAD (AND UPDATE A PRODUCT IMG)
async function uploadImg() {
  const parsedToken = sessionStorage.getItem('token');
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
      window.alert(data);
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

//ADD PRODUCT
function handleAdd(
  product,
  productOptionsData,
  setProductOptionsData,
  tableActive,
  orderList,
  setOrderList
) {
  function searchIdProduct(idToSearch, list) {
    const orderToModify = list.find(
      (listOrder) => listOrder.table === tableActive
    );

    for (let i = 0; i < orderToModify.products.length; i++) {
      if (orderToModify.products[i].id === idToSearch) {
        return i;
      }
    }
    return -1;
  }

  //Esta funcion es generica para los datos que se usan de test en este proyecto,
  //Al momento de conectarlo con base de datos sera necesario realizar inserts desde aqui para mantener la base de datos sincronizada
  //Si ya se ha seleccionado una mesa, de lo contrario no podra mostrar data

  //Se copia el estado que contiene las opciones disponibles del menu de adiciones

  let newProductOptionsData = [...productOptionsData];
  const productAmount = productOptionsData[0].value;
  //Funcion para reinciar el contador de cantidad de producto a añadir
  const restartAmountCounter = () => {
    newProductOptionsData[0].value = 0;
    setProductOptionsData(newProductOptionsData);
  };

  //Busca index de lista en la mesa activa, si no existe retorna -1

  const indexInOrderToModify = orderList.findIndex(
    (order) => order.table === tableActive
  );
  //Si ya existe la orden en la mesa activa
  if (indexInOrderToModify !== -1) {
    //Obtener el index del producto que se agregara en base al id
    const productIndex = searchIdProduct(product.productId, orderList);

    //Si el producto ya existe en la lista activa, s
    if (productIndex != -1) {
      //Crea una copia del arreglo y hace las modificaciones pertinentes en el estado para evitar modificar el estado de manera directa

      const newOrderListArray = orderList.map((listItem) => {
        if (listItem.orderId === indexInOrderToModify) {
          const newProductsArray = listItem.products.map((product, i) => {
            if (i === productIndex) {
              return {
                ...product,
                quantity: product.quantity + productAmount,
                totalPrice: (product.quantity + productAmount) * product.price,
              };
            }
            return product;
          });

          return { ...listItem, products: newProductsArray };
        }
        return listItem;
      });

      //Actualiza estado
      setOrderList(newOrderListArray);
      //Reinicia contador de catidad a agregar
      restartAmountCounter();
    } else {
      //Si el producto no existe en la lista activa, se hace necesario crearlo
      //Si la cantidad a agregar es diferente a cero, de lo contrario no suma nada ya que la seleccion es de cero
      if (productAmount !== 0) {
        let newOrderListArray = orderList.map((orderItem) => {
          if (orderItem.orderId === indexInOrderToModify) {
            const newProductsArray = [
              ...orderItem.products,
              {
                id: product.productId,
                name: product.name,
                quantity: productAmount,
                price: product.price,
                totalPrice: productAmount * product.price,
              },
            ];
            return { ...orderItem, products: newProductsArray };
          }
          return orderItem;
        });
        //Actualiza estado

        setOrderList(newOrderListArray);
        //Reinicia contador de catidad a agregar
        restartAmountCounter();
      }
    }
  } else {
    //Si la mesa no tiene una orden activa debe crearse
    if (productAmount !== 0) {
      const newOrderItem = {
        orderId: orderList.length,
        table: tableActive,
        products: [
          {
            id: product.productId,
            name: product.name,
            quantity: productAmount,
            price: product.price,
            totalPrice: productAmount * product.price,
          },
        ],
      };
      //No se hace necesario copiar el estado debido a que se actualiza de manera directa al no requerir modificar un objeto existente, simplemente se esta gregando uno nuevo
      setOrderList([...orderList, newOrderItem]);
      //Reinicia contador de catidad a agregar
      restartAmountCounter();
    }
  }

  // setIDIdentator(IDIdentator + 1);
}

//DELETE PRODUCT
function handleDelete(id, idOrderActive, orderList, setOrderList) {
  const productIndex = orderList[idOrderActive].products.findIndex(
    (orderItem) => orderItem.id === id
  );

  const newList = orderList.map((order) => ({
    ...order,
    products: [...order.products],
  }));

  newList[idOrderActive].products.splice(productIndex, 1);

  setOrderList(newList);
}

//GET ALL CATEGORIES
async function getAllCategories() {
  const parsedToken = sessionStorage.getItem('token');
  const categories = await fetch(GET_ALL_CATEGORIES_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${parsedToken}`,
    },
  })
    .then((data) => (data = data.json()))
    .catch((error) => {
      window.alert(error);
    });
  return categories;
}

//UPDATE A CATEGORY
async function updateCategory(categoryId) {
  const UPDATE_CATEGORY_URL = `${SERVER_URL}/platzi-market/api/category/update/${categoryId}`;
  const UPLOAD_CATEGORY_IMG_URL = `${SERVER_URL}/platzi-market/api/category/update/${categoryId}`;
  const parsedToken = sessionStorage.getItem('token');
  var formData = new FormData();
  var fileInput = document.getElementById(`fileInput${categoryId}`);

  formData.append('file', fileInput.files[0]);
  fetch(UPLOAD_CATEGORY_IMG_URL, {
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
  const categoryBody = { img: fileInput.files[0].name };

  fetch(UPDATE_CATEGORY_URL, {
    method: 'POST',
    body: JSON.stringify(categoryBody),
    headers: {
      Authorization: `Bearer ${parsedToken}`,
      'Content-Type': 'application/json',
    },
  })
    .catch((error) => console.log(error))
    .finally(window.location.reload());
}

export {
  handleAdd,
  getAllProducts,
  handleDelete,
  signIn,
  getProductsByCategory,
  getProductById,
  uploadImg,
  signOut,
  updateCategory,
  getAllCategories,
};

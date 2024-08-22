const GET_ALL_PRODUCTS = `https://server-market-production.up.railway.app/platzi-market/api/products/all`;
const AUTHENTICATION_URL =
  'https://server-market-production.up.railway.app/platzi-market/api/auth/authenticate';
const credentials = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: 'jhon',
    password: 'Platzi#14',
  }),
};

//AUTHORIZATION
async function authenticate() {
  const parsedToken = await fetch(AUTHENTICATION_URL, credentials)
    .then((res) => res.json().then((res) => res.jwt))
    .catch((error) => {
      window.alert(error);
    });
  return parsedToken;
}

//GET ALL PRODUCTS
async function getAllProducts() {
  const parsedToken = await authenticate();
  return await fetch(GET_ALL_PRODUCTS, {
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
export { handleAdd, getAllProducts, handleDelete };

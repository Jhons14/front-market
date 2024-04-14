import { useState } from 'react';
import { ProductDetails } from '../ProductDetails';
import './index.css';

function ProductBox(props) {
  const [IDIdentator, setIDIdentator] = useState(0);
  const [productOptionsData, setProductOptionsData] = useState([
    {
      id: 1,
      name: 'Amount',
      value: 0,
    },
    {
      id: 2,
      name: 'Size',
      value: '',
    },
  ]);

  const productDetail = () => (
    <section className='product-details'>
      <span>Details</span>
      <section style={{ padding: '8px' }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </section>
    </section>
  );

  function searchIdProduct(idToSearch, list) {
    const orderToModify = list.find(
      (listOrder) => listOrder.table === props.tableActive
    );
    for (let i = 0; i < orderToModify.products.length; i++) {
      if (orderToModify.products[i].id === idToSearch) {
        return i;
      }
    }
    return -1;
  }

  const handleAdd = () => {
    //Esta funcion es generica para los datos que se usan de test en este proyecto,
    //al momento de conectarlo con base de datos sera necesario realizar inserts desde aqui para mantener la base de datos sincronizada
    //Si ya se ha seleccionado una mesa, de lo contrario no podra mostrar data
    if (!!props.tableActive) {
      //Se copia el estado que contiene las opciones disponibles del menu de adiciones
      let newProductOptionsData = [...productOptionsData];
      const productAmount = productOptionsData[0].value;
      //Funcion para reinciar el contador de cantidad de producto a añadir
      const restartAmountCounter = () => {
        newProductOptionsData[0].value = 0;
        setProductOptionsData(newProductOptionsData);
      };

      //Busca index de lista en la mesa activa, si no existe retorna -1
      const indexInOrderToModify = props.orderList.findIndex(
        (order) => order.table === props.tableActive
      );
      //Si ya existe la orden en la mesa activa
      if (indexInOrderToModify !== -1) {
        const productIndex = searchIdProduct(
          props.product.productId,
          props.orderList
        );
        //crea una copia del arrglo en el estado para evitar modificar el estado de manera directa
        const newOrder = [...props.orderList];

        //Si el producto ya existe en la lista activa, suma la cantidad seleccionada en el menu de adicones a la orden exitente
        if (productIndex != -1) {
          let orderProducts = newOrder[indexInOrderToModify].products;
          orderProducts[productIndex].quantity += productAmount;
          restartAmountCounter();
          //Actualiza estado
          props.setOrderList(newOrder);
        } else {
          //Si el producto no existe en la lista activa, se hace necesario crearlo
          //Si la cantidad a agregar es diferente a cero, de lo contrario no suma nada ya que la seleccion es de cero
          if (productAmount !== 0) {
            const orderUpdated = {
              ...newOrder[indexInOrderToModify],
              products: [
                ...newOrder[indexInOrderToModify].products,
                {
                  id: props.product.productId,
                  name: props.product.name,
                  quantity: productAmount,
                  price: props.product.price,
                  totalPrice: productAmount * props.product.price,
                },
              ],
            };
            //Actualiza estado
            restartAmountCounter();
            newOrder[indexInOrderToModify] = orderUpdated;
            props.setOrderList(newOrder);
          }
        }
      } else {
        //Si la mesa no tiene una orden activa debe crearse
        if (productAmount !== 0) {
          props.setOrderList([
            ...props.orderList,
            {
              orderId: IDIdentator,
              table: props.tableActive,
              products: [
                {
                  id: props.product.productId,
                  name: props.product.name,
                  quantity: productAmount,
                  price: props.product.price,
                  totalPrice: productAmount * props.product.price,
                },
              ],
            },
          ]);
          restartAmountCounter();
        }
      }
      setIDIdentator(IDIdentator + 1);
    } else {
      console.log('Please select a table');
    }
  };

  return (
    <div className={`ProductBox`}>
      <p className='product-title'>{props.product.name}</p>
      <div className='product-interface'>
        <section className='product-specifics'>
          <div style={{ border: 'solid 1px' }}>photo</div>
          <ProductDetails
            productOptionsData={productOptionsData}
            setProductOptionsData={setProductOptionsData}
          />
        </section>
        <div
          className='addProduct'
          style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            justifyContent: 'end',
            alignItems: 'end',
          }}
        >
          {productDetail()}
          <section
            style={{
              position: 'absolute',
              bottom: '-24px',
              padding: '8px',
              right: '12px',
              background: 'white',
            }}
          >
            <button className='addToCart-button' onClick={() => handleAdd()}>
              <span>Add product</span>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
export { ProductBox };

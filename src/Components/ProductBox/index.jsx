import { useState, useEffect } from 'react';
import { ProductDetails } from '../ProductDetails';
import './index.css';

function ProductBox(props) {
  const [IDIdentator, setIDIdentator] = useState(0);
  const [imgURL, setImgURL] = useState();
  const [productOptionsData, setProductOptionsData] = useState([
    {
      id: 1,
      name: 'amount',
      value: 0,
    },
    {
      id: 2,
      name: 'size',
      value: '',
    },
    {
      id: 3,
      name: 'upload',
      value: '',
    },
    {
      id: 4,
      name: 'edit',
      value: '',
    },
  ]);

  useEffect(() => {
    const res = props.product.img_url;
    setImgURL(res);
  }, []);

  const productDetail = () => (
    <section className='product-specification'>
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

  //Funcion para obtener el id del producto que se agregara (El ID, no el index)
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
        //Obtener el id del producto que se agregara (El ID, no el index)
        const productIndex = searchIdProduct(
          props.product.productId,
          props.orderList
        );

        //Si el producto ya existe en la lista activa, s
        if (productIndex != -1) {
          //crea una copia del arreglo y hace las modificaciones pertinentes en el estado para evitar modificar el estado de manera directa

          const newOrderListArray = props.orderList.map((listItem) => {
            if (listItem.orderId === indexInOrderToModify) {
              const newProductsArray = listItem.products.map((product, i) => {
                if (i === productIndex) {
                  return {
                    ...product,
                    quantity: product.quantity + productAmount,
                    totalPrice:
                      (product.quantity + productAmount) * product.price,
                  };
                }
                return product;
              });
              return { ...listItem, products: newProductsArray };
            }
            return listItem;
          });
          //Actualiza estado
          props.setOrderList(newOrderListArray);
          //Reinicia contador de catidad a agregar
          restartAmountCounter();
        } else {
          //Si el producto no existe en la lista activa, se hace necesario crearlo
          //Si la cantidad a agregar es diferente a cero, de lo contrario no suma nada ya que la seleccion es de cero
          if (productAmount !== 0) {
            let newOrderListArray = props.orderList.map((orderItem) => {
              if (orderItem.orderId === indexInOrderToModify) {
                const newProductsArray = [
                  ...orderItem.products,
                  {
                    id: props.product.productId,
                    name: props.product.name,
                    quantity: productAmount,
                    price: props.product.price,
                    totalPrice: productAmount * props.product.price,
                  },
                ];
                return { ...orderItem, products: newProductsArray };
              }
              return orderItem;
            });
            //Actualiza estado
            props.setOrderList(newOrderListArray);
            //Reinicia contador de catidad a agregar
            restartAmountCounter();
          }
        }
      } else {
        //Si la mesa no tiene una orden activa debe crearse
        if (productAmount !== 0) {
          const newOrderItem = {
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
          };
          //No se hace necesario copiar el estado debido a que se actualiza de manera directa al no requerir modificar un objeto existente, simplemente se esta gregando uno nuevo
          props.setOrderList([...props.orderList, newOrderItem]);
          //Reinicia contador de catidad a agregar
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
        <section className='product-details'>
          <div className='product-img' onClick={() => getUrl()}>
            <img
              src={`http://localhost:2020/platzi-market/api/images/${imgURL}`}
              alt={imgURL}
              srcset=''
            />
          </div>
          <ProductDetails
            product={props.product}
            productOptionsData={productOptionsData}
            setProductOptionsData={setProductOptionsData}
            optionList={props.optionList}
            typeProductActive={props.typeProductActive}
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

import './index.css';
import { ProductAdditions } from '../ProductAdditions';
import { useState } from 'react';

function ProductBox(props) {
  const [IDIdentator, setIDIdentator] = useState(0);

  const ProductDetail = () => (
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
    for (let i = 0; i < list.length; i++) {
      if (idToSearch === list[props.tableActive - 1].products[i].id) {
        return i;
      }
    }
    return -1;
  }

  const handleAdd = () => {
    //Esta funcion es generica para los datos que se usan de test en este proyecto,
    //al momento de conectarlo con base de datos sera necesario realizar inserts desde aqui para mantener la base de datos sincronizada
    if (!!props.tableActive) {
      const indexToModify = props.orderList.findIndex(
        (order) => order.table === props.tableActive
      );
      //crea una copia del arrglo en el estado para evitar modificar el estado de manera directa
      const newOrder = [...props.orderList];
      //Si existe una orden que modificar
      if (indexToModify !== -1) {
        const idProduct = searchIdProduct(props.productId, props.orderList);
        console.log(idProduct);
        console.log(props.orderList);
        //asigna un nuevo elemento en la orden exitente
        const orderUpdated = {
          ...newOrder[indexToModify],
          products: [
            ...newOrder[indexToModify].products,
            { id: props.productId, name: props.productName, quantity: 0 },
          ],
        };
        //Actualiza estado
        newOrder[indexToModify] = orderUpdated;
        props.setOrderList(newOrder);
      } else {
        props.setOrderList([
          ...props.orderList,
          {
            orderId: IDIdentator,
            table: props.tableActive,
            products: [
              { id: props.productId, name: props.productName, quantity: 0 },
            ],
          },
        ]);
      }
      setIDIdentator(IDIdentator + 1);
    } else {
      console.log('Please select a table');
    }
  };

  return (
    <div className={`ProductBox`}>
      <p className='product-title'>{props.productName}</p>
      <div className='product-interface'>
        <section className='product-specifics'>
          <div style={{ border: 'solid 1px' }}>photo</div>
          <ProductAdditions />
        </section>
        <div style={{ display: 'grid', gridTemplateRows: '2fr 1fr' }}>
          <ProductDetail />
          <div
            style={{
              display: 'flex',
              alignItems: 'end',
              justifyContent: 'flex-end',
            }}
          >
            <button
              className='addToCart-button'
              style={{ cursor: 'pointer' }}
              onClick={() => handleAdd()}
            >
              add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export { ProductBox };

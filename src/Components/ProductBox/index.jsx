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

  const handleAdd = () => {
    //Esta funcion es generica para los datos que se usan de test en este proyecto,
    //al momento de conectarlo con base de datos sera necesario realizar inserts desde aqui para mantener la base de datos sincronizada
    if (!!props.tableActive) {
      const indexToModify = props.orderList.findIndex(
        (order) => order.table === props.tableActive
      );
      const newOrder = [...props.orderList];

      if (indexToModify !== -1) {
        const orderUpdated = {
          ...newOrder[indexToModify],
          products: [...newOrder[indexToModify].products, props.productName],
        };
        newOrder[indexToModify] = orderUpdated;

        props.setOrderList(newOrder);
        // props.orderList.map((order) => {
        //   if (order.table === props.tableActive) {
        //     const orderToModify = order;
        //     if (!!orderToModify) {
        //       const newProductArray= [
        //         ...orderToModify.products,
        //         props.productName,
        //       ];

        //       console.log(indexToModify);
        //       console.log(props.orderList[indexToModify]);
        //       props.setOrderList([orderToModify]);
        //     } else {
        //       props.setOrderList([
        //         ...props.orderList,
        //         {
        //           orderId: IDIdentator,
        //           table: props.tableActive,
        //           id: props.productId,
        //           products: [props.productName],
        //         },
        //       ]);
        //       setIDIdentator(IDIdentator + 1);
        //       console.log(props.orderList);
        //     }
        //   }
        // });
      } else {
        props.setOrderList([
          ...props.orderList,
          {
            orderId: IDIdentator,
            table: props.tableActive,
            id: props.productId,
            products: [props.productName],
          },
        ]);
      }
      setIDIdentator(IDIdentator + 1);
    } else {
      console.log('Please select a table');
    }
    // props.orderList.map((order) =>
    {
      //   console.log(order);
      //   if (!!order.table === props.tableActive) {
      //     order.products.push(props.productName);
      //     console.log(newOrderList);
      //     console.log('1234');
      //   } else {
      //     props.setOrderList([
      //       ...props.orderList,
      //       { products: props.productName, table: props.tableActive },
      //       console.log('123'),
      //     ]);
      //   }
      // );
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

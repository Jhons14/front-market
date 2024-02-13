import './index.css';
import { ProductAdditions } from '../ProductAdditions';

function ProductBox(props) {
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
    props.setCartProducts({ productName: props.name });
  };
  return (
    <div className={`ProductBox`}>
      <p className='product-title'>{props.name}</p>
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
            <button className='addToCart-button' onClick={handleAdd}>
              add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export { ProductBox };

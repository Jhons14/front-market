import './index.css';

function ProductBox(product) {
  console.log('holi');
  return (
    <div className={`ProductBox`}>
      <p>{product.name}</p>
      <p>=</p>
      <p>{product.price}$</p>
    </div>
  );
}
export { ProductBox };

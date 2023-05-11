import "./index.css"

function ProductItem(product){
 return (
  <li className={`ProductItem`}>
    <p>{product.name}</p>
    <p>=</p>
    <p>{product.price}$</p>
  </li>
 );
}
export {ProductItem}
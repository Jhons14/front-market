import { ProductMenu } from '../../Pages/ProductMenu';
import { useProducts } from '../../Utils/useProducts';
function MainMenu(props) {
  const {
    products,
    productsActive,
    typeProductActive,
    setTypeProductActive,
    loading,
    error,
  } = useProducts();

  const onShowMenuDetail = () => {
    return (
      <ProductMenu
        products={products}
        productsActive={productsActive}
        typeProductActive={typeProductActive}
        setTypeProductActive={setTypeProductActive}
        loading={loading}
        error={error}
      ></ProductMenu>
    );
  };

  return (
    <div className='MainMenu-Container'>
      {!props.error && !props.typeProductActive && onShowMenuDetail()}
      {!!props.loading && props.onLoading()}
      {!!props.error && <h1>error</h1>}
    </div>
  );
}
export { MainMenu };

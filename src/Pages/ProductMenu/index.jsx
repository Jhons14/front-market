import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../Utils/useProducts';
import { ProductList } from '../../Components/ProductList';
import { ProductItem } from '../../Components/ProductItem';
import { Title } from '../../Components/MenuTitle';
import { CloseMenuButton } from '../../Components/CloseMenuButton';
import Layout from '../../Components/Layout';
import { ScreenLoading } from '../../common/ScreenLoading';
import { ScreenError } from '../../common/ScreenError';
import './ProductMenu.css';

// <ProductMenu
// typeProductsActive={typeProductActive}
// loading={loading}
// onLoading={() => <ScreenLoading />}
// error={error}
// onError={() => <ScreenError error={error} />}
// >

{
  /* <CloseMenuButton
  typeProductActive={typeProductActive}
  setTypeProductActive={setTypeProductActive}
/>
<Title typeProductActive={typeProductActive} />
<ProductList products={products} productsActive={productsActive}>
  {(product) => (
    <ProductItem
      key={product.productId}
      name={product.name}
      price={product.price}
      id={product.id}
    />
  )}
</ProductList> */
}
function ProductMenu(props) {
  const navigate = useNavigate();

  return (
    <>
      <Layout>
        <button onClick={() => navigate(-1)}>Volver</button>
        <h1>Holaaaa</h1>
      </Layout>
      <div className={`MenuContainer`}>
        <CloseMenuButton
          typeProductActive={props.typeProductActive}
          setTypeProductActive={props.setTypeProductActive}
        />
        <Title typeProductActive={props.typeProductActive} />
        <ProductList
          products={props.products}
          productsActive={props.productsActive}
        >
          {(product) => (
            <ProductItem
              key={product.productId}
              name={product.name}
              price={product.price}
              id={product.id}
            />
          )}
        </ProductList>
      </div>
    </>
  );
}

export { ProductMenu };

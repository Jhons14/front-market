import React from "react";
import { useProducts } from "./useProducts";
import { ProductList } from "../ProductList";
import { ProductItem } from "../ProductItem";
import { ProductMenu } from "../ProductMenu";
import { Title } from "../MenuTitle";
import { MainMenu } from "../MainMenu";
import { CloseMenuButton } from "../CloseMenuButton";
import { ScreenLoading } from "../common/ScreenLoading";
import { Menus } from "../Menus";
import { ScreenError } from "../common/ScreenError";

function AppUI(props) {
  const {
    products,
    productsActive,
    setProductsActive,
    typeProductActive,
    setTypeProductActive,
    loading,
    setLoading,
    error,
  } = useProducts();
  return (
    <React.Fragment>
      <MainMenu
        error={error}
        typeProductActive={typeProductActive}
        onShowMenus={() => (
          <Menus
            setProductsActive={setProductsActive}
            setTypeProductActive={setTypeProductActive}
            setLoading={setLoading}
          />
        )}
      />
      <ProductMenu
        typeProductsActive={typeProductActive}
        loading={loading}
        onLoading={() => <ScreenLoading />}
        error={error}
        onError={() => <ScreenError error={error} />}
      >
        <CloseMenuButton
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
        </ProductList>
      </ProductMenu>
    </React.Fragment>
  );
}
export { AppUI };

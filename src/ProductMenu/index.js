import "./ProductMenu.css";

function ProductMenu(props) {
  const isMenuActive = () => {
    if (!props.loading && !props.error && !!props.typeProductsActive) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      className={`MenuContainer--${isMenuActive()} MenuContainer-error--${!!props.error} MenuContainer-loading--${!!props.loading}`}
    >
      {!!isMenuActive() && props.children}
      {!!props.error && props.onError()}
      {!!props.loading && !props.error && props.onLoading()}
    </div>
  );
}

export { ProductMenu };

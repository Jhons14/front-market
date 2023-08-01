import "./DrinksMenu.css";

function DrinksMenu(props) {
  return (
    <div
      className={`MenuContainer MenuContainer-error--${!!props.error} MenuContainer-loading--${!!props.loading}`}
    >
      {!props.loading &&
        !props.error &&
        !!props.productsActive &&
        props.children}
      {!!props.error && props.onError()}
      {!!props.loading && !props.error && props.onLoading()}
    </div>
  );
}

export { DrinksMenu };

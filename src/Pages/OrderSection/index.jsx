function OrderSection(props) {
  const renderView = () =>
    props.orderList[props.tableActive - 1]?.products.map((product) => (
      <li key={product.id}>{product}</li>
    ));
  return (
    <div className='Table-section'>
      <section>
        <button onClick={() => props.setTableActive(1)}>Table 1</button>
        <button onClick={() => props.setTableActive(2)}>Table 2</button>
      </section>
      <section>
        <ul>{renderView()}</ul>
      </section>
    </div>
  );
}
export { OrderSection };

function OrderSection(props) {
  return (
    <div className='Table-section'>
      <button onClick={() => props.setTableActive(1)}>Table 1</button>
      <button onClick={() => props.setTableActive(2)}>Table 2</button>
    </div>
  );
}
export { OrderSection };

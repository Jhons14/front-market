import './index.css';

function ProductAdditions() {
  const renderButton = () => (
    <div className='product-amount-option'>
      <span>amount</span>
      <section>
        <div className='option-button'>
          <span>-</span>
        </div>
        <div className='option-button'>
          <span>1</span>
        </div>
        <div className='option-button'>
          <span>+</span>
        </div>
      </section>
    </div>
  );
  const AmountOptions = () => {
    return (
      <div className='product-options-container'>
        {renderButton()}
        {renderButton()}
        {renderButton()}
        {renderButton()}
      </div>
    );
  };
  return <AmountOptions />;
}
export { ProductAdditions };

import "./MenuButton.css";

function MenuButton(props) {
  return (
    <button
      className={`MenuButton ${props.category}Button`}
      onClick={() => {
        props.setTypeProductActive(props.category);
        props.setLoading(true);
      }}
    >
      {`Menu ${props.category}`}
    </button>
  );
}

export { MenuButton };

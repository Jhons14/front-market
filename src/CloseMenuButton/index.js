import "./CloseMenuButton.css";

function CloseMenuButton(props) {
  return (
    <button
      className="CloseMenuButton"
      onClick={() => props.setTypeProductActive("")}
    >
      X
    </button>
  );
}

export { CloseMenuButton };

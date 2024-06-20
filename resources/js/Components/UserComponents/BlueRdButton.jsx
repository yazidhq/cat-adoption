export default function BlueRdButton({
  type = "button",
  children,
  onClick = () => {},
}) {
  return (
    <button type={type} className="btn btn-rd-blue" onClick={onClick}>
      {children}
    </button>
  );
}

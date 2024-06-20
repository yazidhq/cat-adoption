export default function BlueOutlineButton({
  type = "button",
  children,
  onClick = () => {},
}) {
  return (
    <button type={type} className="btn btn-outline-blue" onClick={onClick}>
      {children}
    </button>
  );
}

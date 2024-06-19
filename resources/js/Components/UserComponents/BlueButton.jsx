export default function BlueButton({
  type = "button",
  children,
  onClick = () => {},
}) {
  return (
    <button type={type} className="btn btn-blue" onClick={onClick}>
      {children}
    </button>
  );
}

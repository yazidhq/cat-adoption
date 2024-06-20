export default function OrangeButton({
  type = "button",
  children,
  onClick = () => {},
}) {
  return (
    <button type={type} className="btn btn-orange" onClick={onClick}>
      {children}
    </button>
  );
}

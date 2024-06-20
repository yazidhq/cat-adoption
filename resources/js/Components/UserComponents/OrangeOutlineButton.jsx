export default function OrangeOutlineButton({
  type = "button",
  children,
  onClick = () => {},
}) {
  return (
    <button type={type} className="btn btn-outline-orange" onClick={onClick}>
      {children}
    </button>
  );
}

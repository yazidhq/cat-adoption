export default function BlueButton({
  type = "button",
  children,
  onClick = () => {},
  disabled,
}) {
  return (
    <button
      type={type}
      className="btn btn-blue"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default function BlueRdButton({
  type = "button",
  children,
  onClick = () => {},
  ...props
}) {
  return (
    <button
      type={type}
      className="btn btn-rd-blue"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

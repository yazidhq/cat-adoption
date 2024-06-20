export default function OrangeRdButton({
  type = "button",
  children,
  onClick = () => {},
  ...props
}) {
  return (
    <button
      type={type}
      className="btn btn-rd-orange"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

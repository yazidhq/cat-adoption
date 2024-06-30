export default function BlueOutlineButton({
  type = "button",
  children,
  onClick = () => {},
  ...props
}) {
  return (
    <button
      type={type}
      className="btn btn-outline-blue"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

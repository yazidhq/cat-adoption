export default function BlueRdOutlineButton({
  type = "button",
  children,
  onClick = () => {},
  ...props
}) {
  return (
    <button
      type={type}
      className="btn btn-rd-outline-blue"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default function OrangeRdOutlineButton({
  type = "button",
  children,
  onClick = () => {},
  ...props
}) {
  return (
    <button
      type={type}
      className="btn btn-rd-outline-orange"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

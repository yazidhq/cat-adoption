export default function LinkButton({
  color,
  children,
  className,
  btnClick = () => {},
  ...props
}) {
  return (
    <button
      className={`btn btn-link ${color} ${
        className ? className : "text-decoration-none"
      }`}
      onClick={btnClick}
      {...props}
    >
      {children}
    </button>
  );
}

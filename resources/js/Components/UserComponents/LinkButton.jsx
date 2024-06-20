export default function LinkButton({
  children,
  className,
  btnClick = () => {},
  ...props
}) {
  return (
    <button
      className={`btn btn-link ${
        className ? className : "text-decoration-none"
      }`}
      onClick={btnClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default function LinkButton({
  children,
  className,
  btnClick = () => {},
}) {
  return (
    <button
      className={`btn btn-link ${
        className ? className : "text-decoration-none "
      } text-dark`}
      onClick={btnClick}
    >
      {children}
    </button>
  );
}

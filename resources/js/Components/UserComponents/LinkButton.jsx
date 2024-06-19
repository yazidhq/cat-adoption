export default function LinkButton({ children, btnClick = () => {} }) {
  return (
    <button
      className="btn btn-link text-decoration-none text-dark"
      onClick={btnClick}
    >
      {children}
    </button>
  );
}

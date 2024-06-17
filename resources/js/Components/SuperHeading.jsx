export default function SuperHeading({ children, color, size }) {
  return (
    <h1 className={`fw-bold ${color} ${size}`}>
      <span>
        <strong>{children}</strong>
      </span>
    </h1>
  );
}

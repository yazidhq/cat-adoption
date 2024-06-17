export default function SuperHeading({ children, color }) {
  return (
    <h1 className={`fw-bold ${color}`}>
      <span>
        <strong>{children}</strong>
      </span>
    </h1>
  );
}

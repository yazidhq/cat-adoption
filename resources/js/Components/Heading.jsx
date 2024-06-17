export default function Heading({ size, color, children }) {
  return <p className={`fw-bold ${size} ${color}`}>{children}</p>;
}

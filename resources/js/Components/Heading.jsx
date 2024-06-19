export default function Heading({ size, color, children }) {
  return <h2 className={`fw-bold ${size} ${color}`}>{children}</h2>;
}

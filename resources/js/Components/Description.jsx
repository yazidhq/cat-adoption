export default function Description({ children, size, color }) {
  return <p className={`${size} ${color}`}>{children}</p>;
}

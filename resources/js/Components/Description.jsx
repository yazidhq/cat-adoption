export default function Description({ children, size, color }) {
  return (
    <p className={`${size} ${color}`} style={{ textAlign: "justify" }}>
      {children}
    </p>
  );
}

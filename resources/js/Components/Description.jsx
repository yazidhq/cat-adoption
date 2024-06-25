export default function Description({ children, size, color }) {
  return (
    <div className={`${size} ${color}`} style={{ textAlign: "justify" }}>
      {children}
    </div>
  );
}

export default function EventContent({ children }) {
  return (
    <div className="bg-light rounded-top-5" style={{ marginTop: "-3%" }}>
      <div className="container py-5">
        <div className="bg-white rounded-5 shadow-sm">
          <div className="container">{children}</div>
        </div>
      </div>
    </div>
  );
}

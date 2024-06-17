export default function IconedCard({ children }) {
  return (
    <div className="col">
      <div className="bg-light shadow border-0 rounded-4 p-1">
        <div className="d-flex align-item-center justify-content-center">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ItemList({ children, active }) {
  return (
    <li className="nav-item mx-2">
      <div className={`nav-link ${active}`}>{children}</div>
    </li>
  );
}

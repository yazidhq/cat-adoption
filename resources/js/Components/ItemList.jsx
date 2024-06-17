export default function ItemList({ route, children }) {
  return (
    <li className="nav-item mx-2">
      <a className="nav-link active" aria-current="page" href={route}>
        {children}
      </a>
    </li>
  );
}

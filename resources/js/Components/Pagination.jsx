import { Link } from "@inertiajs/react";

export default function Pagination({ links, user }) {
  return (
    <nav className="text-center mt-4">
      {links.map((link) => (
        <Link
          preserveScroll
          href={link.url}
          key={link.label}
          className={`mx-2 ${
            link.active ? (user ? "text-blue" : "text-red") : "text-muted"
          }  text-decoration-none`}
          dangerouslySetInnerHTML={{ __html: link.label }}
        ></Link>
      ))}
    </nav>
  );
}

import { Link } from "@inertiajs/react";
import { IoIosNotifications } from "react-icons/io";

export default function Navbar({ auth }) {
  return (
    <div className="px-5 pt-4 fixed-top">
      <nav className="navbar navbar-expand-lg bg-white rounded-5">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img
              src="/core-img/logo.png"
              alt="Logo"
              className="img-fluid"
              width={"40px"}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <a className="nav-link active" aria-current="page" href="#">
                  ADOPSI
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link active" aria-current="page" href="#">
                  DONASI
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link active" aria-current="page" href="#">
                  EVENT
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link active" aria-current="page" href="#">
                  SHELTER
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link active" aria-current="page" href="#">
                  BLOG
                </a>
              </li>
            </ul>
            <div className="d-flex gap-2">
              {auth.user ? (
                <div className="dropdown">
                  <IoIosNotifications className="mx-3 fs-3 text-red" />
                  <img
                    src="/core-img/default-profile.jpg"
                    alt="profile"
                    className="img-fluid rounded-circle"
                    width={"30px"}
                  />
                  <button
                    className="btn btn-link dropdown-toggle text-decoration-none text-dark"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth.user.name.toUpperCase()}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item"
                        href={
                          auth.user.role == "user" ? "" : route("dashboard")
                        }
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        href={route("logout")}
                        method="post"
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <Link
                    href={route("login")}
                    className="fw-bold text-decoration-none text-red"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

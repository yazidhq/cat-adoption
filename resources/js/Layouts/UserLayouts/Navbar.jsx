import HamburgerButton from "@/Components/HamburgerButton";
import Img from "@/Components/Img";
import ItemList from "@/Components/ItemList";
import { Link } from "@inertiajs/react";
import { IoIosNotifications } from "react-icons/io";

export default function Navbar({ auth }) {
  return (
    <div className="fixed-top">
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container">
          <Link route={"home"} className="navbar-brand">
            <Img src={"/core-img/logo.png"} width={"40px"} />
          </Link>
          <HamburgerButton />
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <ItemList>ADOPSI</ItemList>
              <ItemList>DONASI</ItemList>
              <ItemList>EVENT</ItemList>
              <ItemList>SHELTER</ItemList>
              <ItemList>BLOG</ItemList>
            </ul>
            <div className="d-flex gap-2">
              {auth.user ? (
                <div className="dropdown">
                  <IoIosNotifications className="mx-3 fs-3 text-blue" />
                  <Img
                    src={"/core-img/default-profile.jpg"}
                    classes={"rounded-circle"}
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
                    className="btn btn-outline-blue text-decoration-none"
                  >
                    MASUK
                  </Link>
                  <Link
                    href={route("register")}
                    className="btn btn-blue text-decoration-none"
                  >
                    DAFTAR
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

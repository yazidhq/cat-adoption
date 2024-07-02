import HamburgerButton from "@/Components/HamburgerButton";
import Heading from "@/Components/Heading";
import Img from "@/Components/Img";
import ItemList from "@/Components/ItemList";
import BlueButton from "@/Components/UserComponents/BlueButton";
import BlueOutlineButton from "@/Components/UserComponents/BlueOutlineButton";
import OrangeButton from "@/Components/UserComponents/OrangeButton";
import { Link } from "@inertiajs/react";
import { IoIosNotifications } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";

export default function Navbar({ auth }) {
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className="fixed-top shadow-sm">
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container">
          <Link href={"/"} className="navbar-brand">
            <Img src={"/core-img/logo.png"} width={"40px"} />
          </Link>
          <HamburgerButton />
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Link href={route("adopsi")} className="text-decoration-none">
                <ItemList
                  active={
                    route().current("adopsi") ||
                    route().current("detail_adopsi") ||
                    route().current("pendaftaran_adopsi")
                      ? "fw-bold text-blue"
                      : ""
                  }
                >
                  ADOPSI
                </ItemList>
              </Link>
              <Link
                href={route("daftar_donasi")}
                className="text-decoration-none"
              >
                <ItemList
                  active={
                    route().current("daftar_donasi") ||
                    route().current("detail_donasi")
                      ? "fw-bold text-blue"
                      : ""
                  }
                >
                  DONASI
                </ItemList>
              </Link>
              <Link
                href={route("daftar_event")}
                className="text-decoration-none"
              >
                <ItemList
                  active={
                    route().current("daftar_event") ||
                    route().current("detail_event")
                      ? "fw-bold text-blue"
                      : ""
                  }
                >
                  EVENT
                </ItemList>
              </Link>
              <Link
                href={route("daftar_shelter")}
                className="text-decoration-none"
              >
                <ItemList
                  active={
                    route().current("daftar_shelter") ||
                    route().current("shelter_profile")
                      ? "fw-bold text-blue"
                      : ""
                  }
                >
                  SHELTER
                </ItemList>
              </Link>
              <Link
                href={route("blog_berita")}
                className="text-decoration-none"
              >
                <ItemList
                  active={
                    route().current("blog_berita") ||
                    route().current("detail_berita")
                      ? "fw-bold text-blue"
                      : ""
                  }
                >
                  BLOG
                </ItemList>
              </Link>
            </ul>
            <div className="d-flex gap-2">
              {auth.user ? (
                <div className="dropdown d-flex align-items-center">
                  <div className="dropdown-center">
                    <button
                      className="btn btn-link"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <IoIosNotifications className="mx-2 fs-3 text-blue" />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-custom">
                      <li className="border-bottom">
                        <div className="row px-4 p-3">
                          <div className="col-md-5">
                            <div className="square-img">
                              <Img
                                src={`/core-img/default-profile.jpg`}
                                classes="rounded-4"
                              />
                            </div>
                          </div>
                          <div className="col-md-7">
                            <Heading size={"fs-4 mt-2"} color={"text-blue"}>
                              {truncateText(
                                "Judul Event yang sangat amat panajng judulnya",
                                2
                              )}
                            </Heading>
                            <Heading size={"fs-6 mb-4"}>10 Juni 2024</Heading>
                            <div className="d-flex align-items-center gap-3">
                              <Link>
                                <OrangeButton>Lihat Event</OrangeButton>
                              </Link>
                              <Link>
                                <FaTrashAlt className="text-red" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="position-relative"
                    style={{ width: "35px", height: "35px" }}
                  >
                    <img
                      src={
                        auth.user.foto
                          ? `/user-img/${auth.user.foto}`
                          : `/core-img/default-profile.jpg`
                      }
                      className="w-100 h-100 rounded-circle"
                      style={{ objectFit: "cover" }}
                      alt="Profile"
                    />
                  </div>
                  <button
                    className={`btn btn-link dropdown-toggle text-decoration-none mx-2 ${
                      route().current("user_profile") ||
                      route().current("update_profile") ||
                      route().current("status_adopsi") ||
                      route().current("events") ||
                      route().current("donasi_saya") ||
                      route().current("favorite")
                        ? "fw-bold text-blue"
                        : "text-dark"
                    }`}
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth.user.nama_depan.toUpperCase()}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item"
                        href={
                          auth.user.role === "user"
                            ? route("user_profile")
                            : route("dashboard")
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
                        as="button"
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <Link href={route("login")} className="text-decoration-none">
                    <BlueOutlineButton>MASUK</BlueOutlineButton>
                  </Link>
                  <Link
                    href={route("register")}
                    className="text-decoration-none"
                  >
                    <BlueButton>DAFTAR</BlueButton>
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

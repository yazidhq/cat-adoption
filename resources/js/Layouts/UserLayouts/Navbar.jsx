import HamburgerButton from "@/Components/HamburgerButton";
import Heading from "@/Components/Heading";
import Img from "@/Components/Img";
import ItemList from "@/Components/ItemList";
import BlueButton from "@/Components/UserComponents/BlueButton";
import BlueOutlineButton from "@/Components/UserComponents/BlueOutlineButton";
import OrangeButton from "@/Components/UserComponents/OrangeButton";
import { Link, usePage } from "@inertiajs/react";
import { IoIosNotifications } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import moment from "moment/moment";
import Description from "@/Components/Description";

export default function Navbar({ auth }) {
  const { event_notif } = usePage().props;

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  moment.updateLocale("id", {
    months: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
  });

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
                      <div className="dropdown-container">
                        {event_notif.length === 0 ? (
                          <div className="text-center my-3">
                            <h4>
                              OOPS.. NO{" "}
                              <span className="fw-bold text-blue">EVENTS</span>{" "}
                              FOUND!
                            </h4>
                          </div>
                        ) : (
                          <ul className="event-list">
                            {event_notif.map((item) => (
                              <li className="border-bottom" key={item.id}>
                                <div className="row px-4 p-3">
                                  <div className="col-md-5">
                                    <div className="square-img">
                                      <Img
                                        src={`/event-img/${item.event.poster}`}
                                        classes="rounded-4"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-7">
                                    <Heading
                                      size={"fs-4 mt-1"}
                                      color={"text-blue"}
                                    >
                                      {truncateText(item.event.tema, 2)}
                                    </Heading>
                                    <Heading size={"fs-6 mb-0"}>
                                      {moment(item.event.hari_tanggal).format(
                                        "DD MMMM YYYY"
                                      )}
                                    </Heading>
                                    <div
                                      className="mt-0"
                                      style={{ fontSize: "0.80rem" }}
                                    >
                                      <Description size={"mb-2"}>
                                        {item.event.waktu_mulai} -{" "}
                                        {item.event.waktu_selesai}
                                      </Description>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                      <Link
                                        href={route(
                                          "detail_event",
                                          item.event.id
                                        )}
                                      >
                                        <OrangeButton>Lihat Event</OrangeButton>
                                      </Link>
                                      <Link
                                        href={route(
                                          "hapus_notifikasi",
                                          item.id
                                        )}
                                        method="post"
                                      >
                                        <FaTrashAlt className="text-red" />
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
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

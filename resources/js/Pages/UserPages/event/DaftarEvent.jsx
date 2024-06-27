import Description from "@/Components/Description";
import Heading from "@/Components/Heading";
import Img from "@/Components/Img";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import EventHeading from "@/Components/UserComponents/EventHeading";
import LinkButton from "@/Components/UserComponents/LinkButton";
import EventCategory from "@/Layouts/UserLayouts/EventCategory";
import Hero from "@/Layouts/UserLayouts/Hero";
import SectionPage from "@/Layouts/UserLayouts/SectionPage";
import { Link, router } from "@inertiajs/react";
import moment from "moment/moment";
import { useState } from "react";
import { CgCalendarDates } from "react-icons/cg";
import { FaArrowRightLong } from "react-icons/fa6";

export default function DaftarEvent({
  auth,
  popular_events,
  events,
  info,
  all_events,
  all_info,
  filters,
}) {
  const [kategori, setKategori] = useState(filters.kategori || "");
  const [searchTerm, setSearchTerm] = useState(filters.search || "");

  const handleCategory = (kategori) => {
    setKategori(kategori);
    router.get(
      route(route().current()),
      {
        kategori: kategori,
      },
      {
        preserveState: true,
        replace: true,
      }
    );
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    router.get(
      route(route().current()),
      { search: query },
      {
        preserveState: true,
        replace: true,
      }
    );
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
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
    <SectionPage title={"Daftar Events"} auth={auth}>
      <div className="pt-5">
        <Hero is_event={true} />
        <EventCategory>
          <div className="d-flex justify-content-between p-3 px-5">
            <div>
              <Link href={route("daftar_event")}>
                <LinkButton
                  className={`${
                    kategori === "" ? "fw-bold" : ""
                  } text-dark text-decoration-none`}
                >
                  Terbaru
                </LinkButton>
              </Link>
              <LinkButton
                onClick={() => handleCategory("info")}
                className={`${
                  kategori === "info" ? "fw-bold" : ""
                } text-dark text-decoration-none`}
              >
                Info
              </LinkButton>
              <LinkButton
                onClick={() => handleCategory("events")}
                className={`${
                  kategori === "events" ? "fw-bold" : ""
                } text-dark text-decoration-none`}
              >
                Events
              </LinkButton>
            </div>
            <div>
              <TextInput
                name="search"
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                className="form-control rounded-5 border-dark"
                placeholder="Search"
                disabled={kategori == "" ? true : false}
              />
            </div>
          </div>
        </EventCategory>
        <div className="bg-light">
          <div className="container pb-5">
            {kategori !== "" ? (
              <>
                {kategori === "info" ? (
                  <section>
                    <EventHeading text={"Paw Info"} />
                    {all_info.data.length == 0 ? (
                      <div className="text-center">
                        <h4>
                          OOPS.. NO{" "}
                          <span className="fw-bold text-blue">PAW PAW</span>{" "}
                          FOUND!
                        </h4>
                      </div>
                    ) : (
                      <div className="row row-cols-1 row-cols-md-4 g-3">
                        {all_info.data.map((item) => (
                          <div className="col" key={item.id}>
                            <Link href={route("detail_event", item.id)}>
                              <div className="card text-bg-dark rounded-4 border-0">
                                <div
                                  className="position-relative"
                                  style={{
                                    width: "100%",
                                    paddingTop: "150%",
                                  }}
                                >
                                  <Img
                                    src={`/event-img/${item.poster}`}
                                    className="img-fluid position-absolute top-0 start-0 w-100 h-100 object-fit-cover rounded-4"
                                  />
                                  <div
                                    className={`position-absolute top-0 start-0 m-4  p-2 px-3 bg-${
                                      (item.keterangan === "adopsi" &&
                                        "blue") ||
                                      (item.keterangan === "pengetahuan" &&
                                        "red") ||
                                      (item.keterangan === "kesehatan" &&
                                        "dark-orange")
                                    } text-white rounded-3`}
                                  >
                                    <strong>
                                      {capitalize(item.keterangan)}
                                    </strong>
                                  </div>
                                  <button
                                    className="position-absolute top-0 end-0 m-4 btn btn-link text-decoration-none text-dark"
                                    style={{ zIndex: 1 }}
                                  >
                                    <FaArrowRightLong className="fs-3" />
                                  </button>
                                  <div
                                    className="card-img-overlay rounded-bottom-4 d-flex align-items-end"
                                    style={{
                                      padding: 0,
                                    }}
                                  >
                                    <div
                                      style={{
                                        backgroundColor: "rgba(0, 0, 0, 0.35)",
                                        width: "100%",
                                        padding: "0px",
                                        borderBottomLeftRadius: "1rem",
                                        borderBottomRightRadius: "1rem",
                                      }}
                                    >
                                      <h5 className="card-title fw-bold text-white px-3 pt-2">
                                        {item.tema}
                                      </h5>
                                      <p
                                        className="mt-3 text-justify text-white px-3"
                                        dangerouslySetInnerHTML={{
                                          __html: truncateText(
                                            item.deskripsi,
                                            15
                                          ),
                                        }}
                                      ></p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                    <Pagination links={all_info.links} user={true} />
                  </section>
                ) : (
                  <section>
                    <EventHeading text={"Paw Events"} />
                    {all_events.data.length == 0 ? (
                      <div className="text-center">
                        <h4>
                          OOPS.. NO{" "}
                          <span className="fw-bold text-blue">PAW PAW</span>{" "}
                          FOUND!
                        </h4>
                      </div>
                    ) : (
                      <div className="row row-cols-1 row-cols-md-4 g-3 mb-5">
                        {all_events.data.map((item) => (
                          <div className="col" key={item.id}>
                            <Link
                              href={route("detail_event", item.id)}
                              className="text-decoration-none"
                            >
                              <div className="card rounded-4 border-0 shadow-sm">
                                <div
                                  className="position-relative"
                                  style={{
                                    width: "100%",
                                    paddingTop: "60%",
                                  }}
                                >
                                  <Img
                                    src={`/event-img/${item.poster}`}
                                    className={`img-fluid position-absolute top-0 start-0 w-100 h-100 object-fit-cover rounded-top-4`}
                                  />
                                </div>
                                <div className="card-body">
                                  <div className="d-flex gap-3">
                                    <div className="text-center">
                                      <div className="text-blue fw-bold mb-2">
                                        {moment(item.hari_tanggal)
                                          .format("MMMM")
                                          .toUpperCase()}
                                      </div>
                                      <div className="text-dark fs-3 fw-bold mb-0">
                                        {moment(item.hari_tanggal)
                                          .format("DD")
                                          .toUpperCase()}
                                      </div>
                                    </div>
                                    <div className="border-start border-2">
                                      <Heading size={"fs-5 px-3"}>
                                        {item.tema}
                                      </Heading>
                                      <p
                                        className="mt-2 text-justify px-3"
                                        dangerouslySetInnerHTML={{
                                          __html: truncateText(
                                            item.deskripsi,
                                            5
                                          ),
                                        }}
                                      ></p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                    <Pagination links={all_events.links} user={true} />
                  </section>
                )}
              </>
            ) : (
              <>
                <section>
                  <EventHeading text={"Event Paling Populer"} />
                  {popular_events.length == 0 ? (
                    <div className="text-center">
                      <h4>
                        OOPS.. NO{" "}
                        <span className="fw-bold text-blue">PAW PAW</span>{" "}
                        FOUND!
                      </h4>
                    </div>
                  ) : (
                    <div className="row row-cols-1 row-cols-md-4 g-3 mb-5">
                      {popular_events.map((item) => (
                        <div className="col" key={item.id}>
                          <Link
                            href={route("detail_event", item.id)}
                            className="text-decoration-none"
                          >
                            <div className="card rounded-4 border-0 shadow-sm">
                              <div
                                className="position-relative"
                                style={{
                                  width: "100%",
                                  paddingTop: "60%",
                                }}
                              >
                                <Img
                                  src={`/event-img/${item.poster}`}
                                  className={`img-fluid position-absolute top-0 start-0 w-100 h-100 object-fit-cover rounded-top-4`}
                                />
                              </div>
                              <div className="card-body">
                                <Heading size={"fs-5 px-2"}>
                                  {item.tema}
                                </Heading>
                                <Description
                                  size={"fs-6 px-2 mb-0 pt-1"}
                                  color={"text-secondary"}
                                >
                                  <div style={{ fontSize: "0.85rem" }}>
                                    <CgCalendarDates className="fs-5 mb-1" />{" "}
                                    {item.hari_tanggal}
                                  </div>
                                </Description>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                <section>
                  <EventHeading text={"Paw Info"} />
                  {info.length == 0 ? (
                    <div className="text-center">
                      <h4>
                        OOPS.. NO{" "}
                        <span className="fw-bold text-blue">PAW PAW</span>{" "}
                        FOUND!
                      </h4>
                    </div>
                  ) : (
                    <div className="row row-cols-1 row-cols-md-3 g-3">
                      {info.map((item) => (
                        <div className="col" key={item.id}>
                          <Link
                            href={route("detail_event", item.id)}
                            className="text-decoration-none"
                          >
                            <div className="card text-bg-dark rounded-4 border-0">
                              <div
                                className="position-relative"
                                style={{
                                  width: "100%",
                                  paddingTop: "150%",
                                }}
                              >
                                <Img
                                  src={`/event-img/${item.poster}`}
                                  className="img-fluid position-absolute top-0 start-0 w-100 h-100 object-fit-cover rounded-4"
                                />
                                <div
                                  className={`position-absolute top-0 start-0 m-4  p-2 px-3 bg-${
                                    (item.keterangan === "adopsi" && "blue") ||
                                    (item.keterangan === "pengetahuan" &&
                                      "red") ||
                                    (item.keterangan === "kesehatan" &&
                                      "dark-orange")
                                  } text-white rounded-3`}
                                >
                                  <strong>{capitalize(item.keterangan)}</strong>
                                </div>
                                <button
                                  className="position-absolute top-0 end-0 m-4 btn btn-link text-decoration-none text-dark"
                                  style={{ zIndex: 1 }}
                                >
                                  <FaArrowRightLong className="fs-3" />
                                </button>
                                <div
                                  className="card-img-overlay rounded-bottom-4 d-flex align-items-end"
                                  style={{
                                    padding: 0,
                                  }}
                                >
                                  <div
                                    style={{
                                      backgroundColor: "rgba(0, 0, 0, 0.35)",
                                      width: "100%",
                                      padding: "0px",
                                      borderBottomLeftRadius: "1rem",
                                      borderBottomRightRadius: "1rem",
                                    }}
                                  >
                                    <h5 className="card-title fw-bold text-white px-3 pt-2">
                                      {item.tema}
                                    </h5>
                                    <p
                                      className="mt-3 text-justify text-white px-3"
                                      dangerouslySetInnerHTML={{
                                        __html: truncateText(
                                          item.deskripsi,
                                          20
                                        ),
                                      }}
                                    ></p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                <div>
                  <Img src={"/core-img/need.png"} classes="py-3" />
                </div>

                <section>
                  <EventHeading text={"Paw Events"} />
                  {events.length == 0 ? (
                    <div className="text-center">
                      <h4>
                        OOPS.. NO{" "}
                        <span className="fw-bold text-blue">PAW PAW</span>{" "}
                        FOUND!
                      </h4>
                    </div>
                  ) : (
                    <div className="row row-cols-1 row-cols-md-3 g-3 mb-5">
                      {events.map((item) => (
                        <div className="col" key={item.id}>
                          <Link
                            href={route("detail_event", item.id)}
                            className="text-decoration-none"
                          >
                            <div className="card rounded-4 border-0 shadow-sm">
                              <div
                                className="position-relative"
                                style={{
                                  width: "100%",
                                  paddingTop: "60%",
                                }}
                              >
                                <Img
                                  src={`/event-img/${item.poster}`}
                                  className={`img-fluid position-absolute top-0 start-0 w-100 h-100 object-fit-cover rounded-top-4`}
                                />
                              </div>
                              <div className="card-body">
                                <div className="d-flex gap-3">
                                  <div className="text-center">
                                    <div className="text-blue fw-bold mb-2">
                                      {moment(item.hari_tanggal)
                                        .format("MMMM")
                                        .toUpperCase()}
                                    </div>
                                    <div className="text-dark fs-3 fw-bold mb-0">
                                      {moment(item.hari_tanggal)
                                        .format("DD")
                                        .toUpperCase()}
                                    </div>
                                  </div>
                                  <div className="border-start border-2">
                                    <Heading size={"fs-5 px-3"}>
                                      {item.tema}
                                    </Heading>
                                    <p
                                      className="mt-2 text-justify px-3"
                                      dangerouslySetInnerHTML={{
                                        __html: truncateText(
                                          item.deskripsi,
                                          10
                                        ),
                                      }}
                                    ></p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </SectionPage>
  );
}

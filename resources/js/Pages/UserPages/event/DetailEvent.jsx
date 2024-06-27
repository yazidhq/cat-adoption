import Description from "@/Components/Description";
import Heading from "@/Components/Heading";
import Img from "@/Components/Img";
import BlueButton from "@/Components/UserComponents/BlueButton";
import MapLeaf from "@/Components/UserComponents/MapLeaf";
import SosmedButton from "@/Components/UserComponents/SosmedButton";
import SectionPage from "@/Layouts/UserLayouts/SectionPage";
import { Link, router } from "@inertiajs/react";
import moment from "moment/moment";
import {
  FaArrowRightLong,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";
import { IoShareSocial } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function DetailEvent({
  auth,
  event,
  events,
  info,
  successMessage,
  registeredMessage,
}) {
  useEffect(() => {
    if (successMessage || registeredMessage) {
      Swal.fire({
        title: successMessage ? "Selamat Bergabung" : "Maaf",
        text: successMessage ? successMessage : registeredMessage,
        icon: successMessage ? "success" : "question",
        showCancelButton: true,
        confirmButtonText: "Periksa Event",
        cancelButtonText: "Kembali",
      }).then((result) => {
        if (result.isConfirmed) {
          router.get(route("user_profile"));
        }
      });
    }
  }, [successMessage, registeredMessage]);

  const handleRegistration = () => {
    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah Anda yakin untuk mendaftar event ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, daftar sekarang",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        router.get(route("proses_pendaftaran_event", event.id));
      }
    });
  };

  const handleLokasi = () => {
    const address = event.lokasi;
    const formattedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
    window.open(googleMapsUrl, "_blank");
  };

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

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
    weekdays: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
  });

  return (
    <SectionPage title={"Event"} auth={auth}>
      <div className="bg-light pt-5">
        <div className="container pt-5 mt-3 pb-5">
          <div className="bg-white shadow-sm p-5 rounded-4">
            <p>
              {event.peserta.map(
                (item) =>
                  item.user_id === auth.user.id && (
                    <div className="alert alert-warning  text-center">
                      <strong>
                        Anda sudah terdaftar di Event ini, periksa{" "}
                        <Link
                          href={route("user_profile")}
                          className="text-decoration-none text-blue"
                        >
                          Event Terdaftar
                        </Link>
                      </strong>
                    </div>
                  )
              )}
            </p>
            <div className="col-2">
              {event.kategori == "info" && (
                <Link
                  href={route("daftar_event", {
                    kategori: "info",
                    search: event.keterangan,
                  })}
                  className="text-decoration-none"
                >
                  <div
                    className={`p-1 text-center bg-${
                      (event.keterangan === "adopsi" && "blue") ||
                      (event.keterangan === "pengetahuan" && "red") ||
                      (event.keterangan === "kesehatan" && "dark-orange")
                    } text-white rounded-3`}
                  >
                    <strong>{capitalize(event.keterangan)}</strong>
                  </div>
                </Link>
              )}
            </div>
            <div className="mt-4 mb-3">
              <Heading size={"display-4"}>{event.tema}</Heading>
            </div>
            <Heading size={"fs-3 text-center mb-4"}>
              <GoDotFill />
              <GoDotFill />
              <GoDotFill />
            </Heading>
            <div
              className="position-relative mb-5"
              style={{
                width: "100%",
                paddingTop: "60%",
              }}
            >
              <Img
                src={`/event-img/${event.poster}`}
                className="img-fluid position-absolute top-0 start-0 w-100 h-100 object-fit-cover rounded-4"
              />
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="d-flex flex-column gap-2 mb-5">
                  <Heading color={"text-blue"}>= Waktu dan Tempat =</Heading>
                  <Description>
                    Tanggal :{" "}
                    {moment(event.hari_tanggal).format("dddd, DD MMMM YYYY")}
                  </Description>
                  <Description>
                    Waktu : {`${event.waktu_mulai} - ${event.waktu_selesai}`}
                  </Description>
                  <Description>Lokasi : {event.lokasi}</Description>
                </div>
                <div className="d-flex flex-column gap-2 mb-4">
                  <Heading color={"text-blue"}>= Pengenalan Event =</Heading>
                  <p
                    className="mt-3 text-justify"
                    dangerouslySetInnerHTML={{
                      __html: event.deskripsi,
                    }}
                  ></p>
                </div>
                <div className="d-flex flex-column gap-2 mb-4">
                  <Heading color={"text-blue"}>= Syarat Partisipasi =</Heading>
                  <p
                    className="mt-3 text-justify"
                    dangerouslySetInnerHTML={{
                      __html: event.syarat_partisipasi,
                    }}
                  ></p>
                </div>
                <div className="d-flex flex-column gap-2 mb-4">
                  <Heading color={"text-blue"}>= Benefit Event =</Heading>
                  <p
                    className="mt-3 text-justify"
                    dangerouslySetInnerHTML={{
                      __html: event.benefit,
                    }}
                  ></p>
                </div>
                <div className="d-flex flex-column gap-2">
                  <Heading color={"text-blue"}>= Pendaftaran =</Heading>
                  <div className="d-flex justify-content-start">
                    <Link onClick={handleRegistration}>
                      <BlueButton
                        disabled={event.peserta.some(
                          (item) => item.user_id === auth.user.id
                        )}
                      >
                        {event.peserta.some(
                          (item) => item.user_id === auth.user.id
                        )
                          ? "Anda Sudah Daftar"
                          : "Daftar Sekarang"}
                      </BlueButton>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <MapLeaf lat={event.latitude} long={event.longitude} />
                <div className="d-grid mt-2">
                  <BlueButton onClick={handleLokasi}>Buka Map</BlueButton>
                </div>
                <Heading color={"text-blue"} size={"fs-4 mt-4"}>
                  {event.tempat}
                </Heading>
                <div className="mt-3">
                  <Description>{event.lokasi}</Description>
                </div>
                <div className="d-flex align-items-center gap-2 mt-4">
                  <SosmedButton icon={<IoShareSocial />} />
                  <SosmedButton icon={<FaInstagram />} />
                  <SosmedButton icon={<FaFacebookF />} />
                  <SosmedButton icon={<FaYoutube />} />
                </div>
                <div className="mt-5">
                  <Img src={"/core-img/jangan_lewatkan.png"} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container text-center pb-5">
          <Heading size={"display-4 mb-5"} color={"text-blue"}>
            <strong>
              {event.kategori === "info" ? "Info" : "Event"} Menarik Lainnya
            </strong>
          </Heading>
          <div>
            {event.kategori === "info" ? (
              <section>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                  {info.map((item) => (
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
                                (item.keterangan === "adopsi" && "blue") ||
                                (item.keterangan === "pengetahuan" && "red") ||
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
                                    __html: truncateText(item.deskripsi, 15),
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
              </section>
            ) : (
              <section>
                <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
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
                                    __html: truncateText(item.deskripsi, 5),
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
              </section>
            )}
          </div>
        </div>
      </div>
    </SectionPage>
  );
}

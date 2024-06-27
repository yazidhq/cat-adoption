import DashboardSection from "@/Components/DashboardSection";
import RedButton from "@/Components/RedButton";
import { Link, router } from "@inertiajs/react";
import moment from "moment";
import { useEffect } from "react";
import { IoCaretBackOutline } from "react-icons/io5";
import Swal from "sweetalert2";

export default function DetailEvent({
  auth,
  event,
  successMessage,
  errorMessage,
}) {
  useEffect(() => {
    if (successMessage || errorMessage) {
      Swal.fire({
        position: "top-end",
        icon: successMessage ? "success" : "error",
        title: successMessage || errorMessage,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        router.reload({ preserveState: false });
      });
    }
  }, [successMessage, errorMessage]);

  return (
    <DashboardSection
      auth={auth.user}
      heading={event.tema}
      title={"Detail event"}
    >
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container">
          <div className="flex pt-3">
            <div className="lg:w-1/2 w-full object-cover">
              <img
                src={`/event-img/${event.poster}`}
                style={{ maxHeight: "400px" }}
                className="rounded-lg"
              />
              <div className="mt-3">
                <p className="fw-bold fs-5">PESERTA EVENT</p>
                {/* {komentar.map((item) => ( */}
                <div className="mt-3 px-3 py-2 border rounded-lg">
                  <div className="flex justify-content-between">
                    <p className="fw-bold">Nama Peserta</p>
                    <p>Daftar Pada: 20/20/2024</p>
                    <Link className="text-red">delete</Link>
                  </div>
                </div>
                {/* ))} */}
              </div>
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <div className="flex justify-content-between">
                <div>
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                    {event.tema.toUpperCase()}
                  </h1>
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    Hari tanggal :{" "}
                    {moment(event.hari_tanggal).format("DD/MM/YY")}
                  </h2>
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    Waktu acara : {event.waktu_mulai} s/d {event.waktu_selesai}
                  </h2>
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    Kategori : {event.kategori}
                  </h2>
                  {event.kategori === "info" && (
                    <h2 className="text-sm title-font text-gray-500 tracking-widest">
                      Keterangan : {event.keterangan}
                    </h2>
                  )}
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    Nama Tempat : {event.tempat}
                  </h2>
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    Alamat Lengkap : {event.lokasi}
                  </h2>
                </div>
                <Link href={route("event.index")}>
                  <RedButton>
                    <IoCaretBackOutline /> <span className="pr-2">Back</span>
                  </RedButton>
                </Link>
              </div>
              <p
                className="mt-3 text-justify"
                dangerouslySetInnerHTML={{
                  __html: event.deskripsi,
                }}
              ></p>
            </div>
          </div>
        </div>
      </section>
    </DashboardSection>
  );
}

import Description from "@/Components/Description";
import Heading from "@/Components/Heading";
import Img from "@/Components/Img";
import Pagination from "@/Components/Pagination";
import ImgCard from "@/Components/UserComponents/ImgCard";
import LinkButton from "@/Components/UserComponents/LinkButton";
import Profile from "@/Layouts/UserLayouts/Profile";
import { Link, router } from "@inertiajs/react";
import moment from "moment";
import "moment/locale/id";
import { useState } from "react";

export default function StatusAdopsi({ auth, adopsi, filters }) {
  const [status, setStatus] = useState(filters.status || "");

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

  const handleStatusClick = (stats) => {
    setStatus(stats);
    router.get(
      route(route().current()),
      {
        status: stats,
      },
      {
        preserveState: true,
        replace: true,
      }
    );
  };

  return (
    <Profile auth={auth} title={"Status Adposi"}>
      <div className="px-4 ">
        <div className="position-relative">
          <Img
            src={`/core-img/topbar.png`}
            className="img-fluid status_adopsi_img"
          />
          <div className="position-absolute top-0 start-0 pt-3 px-5 text-white">
            <Heading color={"text-dark"}>
              Hai, {capitalize(auth.user.nama_depan)}
            </Heading>
            <Description color={"text-dark"}>
              {(status === "" && "Lanjutkan perjalanan adopsimu.") ||
                (status === "proses" &&
                  "Kamu sudah menyelesaikan Langkah pertama.") ||
                (status === "terima" && (
                  <>
                    Berkas yang kamu kirim sudah diterima, kami akan
                    menghubungimu
                    <br />
                    lewat WA untuk informasi tambahan lainnya.
                  </>
                )) ||
                (status === "selesai" && (
                  <>
                    Terimakasih sudah mau bekerja sama dengan Repaw, kami harap
                    kamu
                    <br />
                    dan teman barumu bahagia selalu ^^.
                  </>
                ))}
            </Description>
          </div>
        </div>
        <div className="col-6 row row-cols-1 row-cols-lg-4 mt-3 mb-2">
          <div className="col">
            <Link
              href={route("status_adopsi")}
              className={`btn btn-link text-dark fw-bold ${
                status == ""
                  ? "text-decoration-underline"
                  : "text-decoration-none"
              } `}
            >
              Semua
            </Link>
          </div>
          <div className="col">
            <LinkButton
              btnClick={() => handleStatusClick("proses")}
              color={`text-dark fw-bold ${
                status == "proses" && "text-decoration-underline"
              } `}
            >
              Diproses
            </LinkButton>
          </div>
          <div className="col">
            <LinkButton
              btnClick={() => handleStatusClick("terima")}
              color={`text-dark fw-bold ${
                status == "terima" && "text-decoration-underline"
              } `}
            >
              Diterima
            </LinkButton>
          </div>
          <div className="col">
            <LinkButton
              btnClick={() => handleStatusClick("selesai")}
              color={`text-dark fw-bold ${
                status == "selesai" && "text-decoration-underline"
              } `}
            >
              Selesai
            </LinkButton>
          </div>
        </div>
        {adopsi.data.length === 0 ? (
          <div className="text-center">
            <h4 className="py-5">
              OOPS.. NO <span className="fw-bold text-blue">PAW PAW</span>{" "}
              FOUND!
            </h4>
          </div>
        ) : (
          <>
            {adopsi.data.map((item) => (
              <div className="p-3 mx-2 border rounded-4 mb-3" key={item.id}>
                <div className="row">
                  <div className="col-lg-3">
                    <ImgCard
                      img={item.hewan.foto}
                      is_detail={true}
                      is_status={true}
                    />
                  </div>
                  <div className="col-lg-7 mt-3">
                    <Heading size={"fs-4"}>
                      {capitalize(item.hewan.nama)} ({" "}
                      {capitalize(item.hewan.kategori)}{" "}
                      {capitalize(item.hewan.jenis_hewan)} )
                    </Heading>
                    <Description>
                      {moment(item.created_at).format("DD MMMM YYYY")}
                      {item.created_at !== item.updated_at && (
                        <>
                          {" "}
                          |{" "}
                          <span className="text-dark-orange fw-bold">
                            {moment(item.updated_at).format("DD MMMM YYYY")}
                          </span>
                        </>
                      )}
                    </Description>
                  </div>
                  <div className="col-lg-2">
                    <div className="mt-3 text-end">
                      <button
                        className={`btn 
                            ${
                              (item.status == "proses" && "btn-orange") ||
                              (item.status == "terima" && "btn-blue") ||
                              (item.status == "selesai" && "btn-success")
                            }
                            `}
                      >
                        {item.status == "proses" && "Proses"}
                        {item.status == "terima" && "Diterima"}
                        {item.status == "selesai" && "Selesai"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Pagination links={adopsi.links} user={true} />
          </>
        )}
      </div>
    </Profile>
  );
}

import DashboardSection from "@/Components/DashboardSection";
import Heading from "@/Components/Heading";
import Img from "@/Components/Img";
import RedButton from "@/Components/RedButton";
import { Link, router } from "@inertiajs/react";
import moment from "moment";
import { IoCaretBackOutline } from "react-icons/io5";
import { FaCircleArrowRight } from "react-icons/fa6";

export default function DetailBerita({ auth, adopsi }) {
  return (
    <DashboardSection
      auth={auth.user}
      heading={"Detail Adopsi"}
      title={"Detail Adopsi"}
    >
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 pt-3 gap-7">
            <div className="lg:w-full object-cover">
              <Heading color={"text-dark"} size={"fs-2 mb-3"}>
                DOKUMEN FOTO
              </Heading>
              <iframe
                src={`/dokumen-img/${adopsi.dokumen_foto}`}
                width="100%"
                height="600px"
                className="rounded-3 border border-dark p-2"
              ></iframe>
            </div>
            <div className="lg:w-full">
              <Heading color={"text-dark"} size={"fs-2 mb-3"}>
                BIODATA USER
              </Heading>
              <div className="border border-dark rounded-3 p-3 col">
                <h2 className="text-center text-sm title-font text-gray-500 tracking-widest">
                  Diadopsi pada tanggal{" "}
                  {moment(adopsi.created_at).format("DD MMMM YYYY")}
                </h2>
                <h1 className="flex justify-content-between text-gray-900 text-2md title-font mt-4">
                  Nama{" "}
                  <p className="fw-bold">
                    {adopsi.user.nama_depan} {adopsi.user.nama_belakang}
                  </p>
                </h1>
                <h1 className="flex justify-content-between text-gray-900 text-2md title-font mt-3">
                  Email <p className="fw-bold">{adopsi.user.email}</p>
                </h1>
                <h1 className="flex justify-content-between text-gray-900 text-2md title-font mt-3">
                  Nomor Telepon{" "}
                  <p className="fw-bold">{adopsi.user.nomor_wa}</p>
                </h1>
                <h1 className="flex justify-content-between text-gray-900 text-2md title-font mt-3">
                  Alamat <p className="fw-bold">{adopsi.user.alamat}</p>
                </h1>
                <h1 className="flex justify-content-between text-gray-900 text-2md title-font mt-3">
                  Usia <p className="fw-bold">{adopsi.usia} Tahun</p>
                </h1>
              </div>
              <div className="border border-dark rounded-3 p-3 col mt-3">
                <h1 className="text-gray-900 text-2md title-font">
                  Apakah anda memilki hewan peliharaan lain? Sertakan jenis
                  hewan apa : <br />
                  <span className="fw-bold">
                    = {adopsi.apakah_ada_peliharaan_lain}
                  </span>
                </h1>
              </div>
              <div className="border border-dark rounded-3 p-3 col mt-3">
                <h1 className="text-gray-900 text-2md title-font mt-2">
                  Berapa orang yang tinggal di sini dan apakah ada yang memiliki
                  alergi? : <br />
                  <span className="fw-bold">
                    = {adopsi.berapa_orang_yang_tinggal_bersama}
                  </span>
                </h1>
              </div>
            </div>
            <div className="lg:w-full">
              <Heading color={"text-dark"} size={"fs-2 mb-3"}>
                BIODATA HEWAN
              </Heading>
              <div className="border border-dark rounded-3 p-3 col">
                <Img
                  src={`/hewan-img/${adopsi.hewan.foto}`}
                  className="img-fluid top-0 start-0 w-100 h-100 object-fit-cover mb-3 rounded-3"
                />
                <h1 className="flex justify-content-between text-gray-900 text-1xl title-font mt-3">
                  Nama <p className="fw-bold">{adopsi.hewan.nama}</p>
                </h1>
                <h1 className="flex justify-content-between text-gray-900 text-1xl title-font mt-3">
                  Kategori <p className="fw-bold">{adopsi.hewan.kategori}</p>
                </h1>
                <h1 className="flex justify-content-between text-gray-900 text-1xl title-font mt-3">
                  Jenis <p className="fw-bold">{adopsi.hewan.jenis_hewan}</p>
                </h1>
                <h1 className="flex justify-content-between text-gray-900 text-1xl title-font mt-3">
                  Kelamin <p className="fw-bold">{adopsi.hewan.kelamin}</p>
                </h1>
                <h1 className="flex justify-content-between text-gray-900 text-1xl title-font mt-3">
                  Pemilik{" "}
                  <p className="fw-bold">
                    {adopsi.hewan.shelter_id
                      ? adopsi.hewan.shelter.nama
                      : adopsi.hewan.user.nama_depan +
                        " " +
                        adopsi.hewan.user.nama_belakang}
                  </p>
                </h1>
              </div>
            </div>
          </div>
          <div className="flex justify-content-between mt-3">
            <Link href={route("adopsi_status.index")}>
              <RedButton>
                <IoCaretBackOutline /> <span className="pr-2">Back</span>
              </RedButton>
            </Link>
            <Link
              href={route("terima_adopsi", adopsi.id)}
              method="post"
              as="button"
            >
              <RedButton>
                <span className="pl-2">Terima</span>
                <FaCircleArrowRight className="mx-2" />
              </RedButton>
            </Link>
          </div>
        </div>
      </section>
    </DashboardSection>
  );
}

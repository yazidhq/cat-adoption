import DashboardSection from "@/Components/DashboardSection";
import RedButton from "@/Components/RedButton";
import { Link, router } from "@inertiajs/react";
import moment from "moment";
import { useEffect } from "react";
import { IoCaretBackOutline } from "react-icons/io5";
import Swal from "sweetalert2";

export default function DetailDonasi({
  auth,
  donasi,
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

  const formatToRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <DashboardSection
      auth={auth.user}
      heading={donasi.tema_donasi}
      title={"Detail Donasi"}
    >
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container">
          <div className="flex pt-3">
            <div className="lg:w-1/2 w-full object-cover">
              <img
                src={`/donasi-img/${donasi.gambar}`}
                style={{ maxHeight: "400px" }}
                className="rounded-lg"
              />
              <div className="mt-4 mb-2">
                <div className="flex justify-content-between">
                  <p className="fw-bold fs-5">TARGET DANA</p>
                  <p className="fs-5">{formatToRupiah(donasi.target_dana)}</p>
                </div>
              </div>
              <hr />
              <div className="mt-3">
                <p className="fw-bold fs-5">DAFTAR DONATUR</p>
                {/* {komentar.map((item) => ( */}
                <div className="mt-3 px-3 py-2 border rounded-lg">
                  <div className="flex justify-content-between">
                    <div>
                      <p className="fw-bold">Nama Donatur</p>
                      <p>20/20/2024</p>
                    </div>
                    <div className="text-end">
                      <p className="fw-bold">Rp. 20.000</p>
                      <Link className="text-red">delete</Link>
                    </div>
                  </div>
                </div>
                {/* ))} */}
              </div>
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <div className="flex justify-content-between">
                <div>
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                    {donasi.tema_donasi}
                  </h1>
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    Batas Waktu{" "}
                    {moment(donasi.batas_waktu).format("DD/MM/YY HH:mm")}
                  </h2>
                </div>
                <Link href={route("donasi.index")}>
                  <RedButton>
                    <IoCaretBackOutline /> <span className="pr-2">Back</span>
                  </RedButton>
                </Link>
              </div>
              <p
                className="mt-5 text-justify"
                dangerouslySetInnerHTML={{
                  __html: donasi.deskripsi,
                }}
              ></p>
              <div className="flex mt-4"></div>
            </div>
          </div>
        </div>
      </section>
    </DashboardSection>
  );
}

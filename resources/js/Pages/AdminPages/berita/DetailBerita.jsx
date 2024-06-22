import DashboardSection from "@/Components/DashboardSection";
import RedButton from "@/Components/RedButton";
import { Link, router } from "@inertiajs/react";
import moment from "moment";
import { useEffect } from "react";
import { IoCaretBackOutline } from "react-icons/io5";
import Swal from "sweetalert2";

export default function DetailBerita({
  auth,
  berita,
  komentar,
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
      heading={berita.judul}
      title={"Detail Berita"}
    >
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="lg:mt-0">
              <img
                src={`/berita-img/${berita.gambar}`}
                style={{
                  maxHeight: "400px",
                  width: "100%",
                  objectFit: "cover",
                }}
                className="rounded-lg"
              />
              <div className="mt-4">
                <p className="fw-bold">KOMENTAR BERITA</p>
                {komentar.map((item) => (
                  <div className="mt-3 p-3 border rounded-lg" key={item.id}>
                    <div className="flex justify-content-between">
                      <p className="fw-bold">{item.user.nama_depan}</p>
                      <Link
                        href={route("destroy_komentar", item.id)}
                        className="text-red"
                        method="delete"
                      >
                        Delete
                      </Link>
                    </div>
                    <p className="mt-3">{item.komentar}</p>
                    <p className="mt-3 text-end">
                      {moment(item.created_at).format("DD/MM/YY HH:mm")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="w-full">
                <div className="flex justify-content-between">
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                    {berita.judul} | {berita.kategori}
                  </h1>
                  <Link href={route("berita.index")}>
                    <RedButton>
                      <IoCaretBackOutline /> <span className="pr-2">Back</span>
                    </RedButton>
                  </Link>
                </div>
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  Created At{" "}
                  {moment(berita.created_at).format("DD/MM/YY HH:mm")}
                </h2>
                <p
                  className="mt-3 text-justify"
                  dangerouslySetInnerHTML={{
                    __html: berita.deskripsi,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DashboardSection>
  );
}

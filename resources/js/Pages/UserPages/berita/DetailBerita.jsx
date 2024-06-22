import Description from "@/Components/Description";
import Heading from "@/Components/Heading";
import Img from "@/Components/Img";
import Pagination from "@/Components/Pagination";
import BlueButton from "@/Components/UserComponents/BlueButton";
import OrangeButton from "@/Components/UserComponents/OrangeButton";
import SectionPage from "@/Layouts/UserLayouts/SectionPage";
import { Link, useForm } from "@inertiajs/react";
import moment from "moment";

export default function BlogBerita({ auth, berita, komentar }) {
  const { data, setData, post } = useForm({
    komentar: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("tambah_komentar", berita.id)).then(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setData("komentar", "");
    });
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
    <SectionPage title={"Blog Berita"} auth={auth}>
      <div className="bg-light pt-5">
        <div className="py-4 mt-5">
          <div className="container">
            <div className="mb-3">
              <Link
                href={route("blog_berita", {
                  kategori: berita.kategori,
                })}
              >
                <BlueButton>{berita.kategori}</BlueButton>
              </Link>
            </div>
            <Heading>{berita.judul}</Heading>
            <div className="row mt-5">
              <div className="col-md-9">
                <Img src={`/berita-img/${berita.gambar}`} />
                <Description color={"text-secondary py-3"}>
                  {moment(berita.created_at).format("DD MMMM YYYY")} |{" "}
                  {berita.kategori}
                </Description>
                <Description>
                  <div
                    className="mt-3 text-justify"
                    dangerouslySetInnerHTML={{
                      __html: berita.deskripsi,
                    }}
                  ></div>
                </Description>
                <div className="mt-5">
                  <Heading size={"fs-5"}>Kirim Komentar</Heading>
                  <form onSubmit={submit}>
                    <div className="d-grid">
                      <textarea
                        name="komentar"
                        style={{ minHeight: "150px", resize: "vertical" }}
                        className="rounded-1 p-2"
                        value={data.komentar}
                        onChange={(e) => setData("komentar", e.target.value)}
                      />
                    </div>
                    <div className="mt-4 text-end">
                      <OrangeButton type="submit">Kirim</OrangeButton>
                    </div>
                  </form>
                </div>
                {komentar.data.length !== 0 && (
                  <div className="mt-4">
                    {komentar.data.map((item) => (
                      <div
                        className="bg-white rounded-1 shadow-sm mt-4 pt-3 px-3 pb-1"
                        key={item.id}
                      >
                        <div className="d-flex justify-content-between">
                          <Heading size={"fs-5"}>
                            {item.user.nama_depan} {item.user.nama_belakang}
                          </Heading>
                          <Description color={"text-secondary"}>
                            {moment(item.created_at).format(
                              "DD MMMM YYYY - HH:mm"
                            )}
                          </Description>
                        </div>
                        <Description>{item.komentar}</Description>
                      </div>
                    ))}
                    <Pagination links={komentar.links} user={true} />
                  </div>
                )}
              </div>
              <div className="col-md-3">
                <div className="bg-white rounded-3 shadow-sm d-flex flex-column gap-3 px-3 py-3 sticky-sidebar">
                  <Link
                    href={route("blog_berita", { kategori: "Edukasi" })}
                    className="text-decoration-none fs-5 text-dark fw-medium"
                  >
                    Edukasi
                  </Link>
                  <Link
                    href={route("blog_berita", { kategori: "Event" })}
                    className="text-decoration-none fs-5 text-dark fw-medium"
                  >
                    Event
                  </Link>
                  <Link
                    href={route("blog_berita", {
                      kategori: "Penyaluran Donasi",
                    })}
                    className="text-decoration-none fs-5 text-dark fw-medium"
                  >
                    Penyaluran Donasi
                  </Link>
                  <Link
                    href={route("blog_berita", { kategori: "Serba-Serbi" })}
                    className="text-decoration-none fs-5 text-dark fw-medium"
                  >
                    Serba-Serbi
                  </Link>
                  <Link
                    href={route("blog_berita")}
                    className="text-decoration-none fs-5 text-dark fw-medium"
                  >
                    Lihat Semua
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionPage>
  );
}

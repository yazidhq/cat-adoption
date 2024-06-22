import Description from "@/Components/Description";
import Heading from "@/Components/Heading";
import Pagination from "@/Components/Pagination";
import ImgCard from "@/Components/UserComponents/ImgCard";
import LinkButton from "@/Components/UserComponents/LinkButton";
import OrangeButton from "@/Components/UserComponents/OrangeButton";
import SectionPage from "@/Layouts/UserLayouts/SectionPage";
import { Link, router } from "@inertiajs/react";
import moment from "moment";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

export default function BlogBerita({ auth, berita, filters }) {
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [kategori, setKategori] = useState(filters.kategori || "");

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

  const handleKategoriClick = (kategori) => {
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
    <SectionPage title={"Blog Berita"} auth={auth}>
      <div className="pt-5 mb-5">
        <div className="bg-blue pb-3">
          <div className="container">
            <div className="row mb-2 pt-5">
              <div className="col-lg-6 px-0">
                <Link href={route("blog_berita")}>
                  <LinkButton color={"text-white fw-medium"}>Semua</LinkButton>
                </Link>
                <LinkButton
                  btnClick={() => handleKategoriClick("Edukasi")}
                  color={"text-white fw-medium"}
                >
                  Edukasi
                </LinkButton>
                <LinkButton
                  btnClick={() => handleKategoriClick("Event")}
                  color={"text-white fw-medium"}
                >
                  Event
                </LinkButton>
                <LinkButton
                  btnClick={() => handleKategoriClick("Penyaluran Donasi")}
                  color={"text-white fw-medium"}
                >
                  Penyaluran Donasi
                </LinkButton>
                <LinkButton
                  btnClick={() => handleKategoriClick("Serba-Serbi")}
                  color={"text-white fw-medium"}
                >
                  Serba-Serbi
                </LinkButton>
              </div>
              <div className="col-lg-6 d-flex justify-content-end px-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="form-control rounded-5"
                  placeholder="Cari artikel, topik atau berita lainnya"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="py-4">
          <div className="container">
            <div className="border-start border-5 border-info">
              <Heading color={"text-dark mx-3 mb-4"}>Terbaru</Heading>
            </div>
            {berita.data.length === 0 ? (
              <div className="text-center">
                <h4 className="py-5">
                  OOPS.. NO <span className="fw-bold text-blue">ARTICEL</span>{" "}
                  FOUND!
                </h4>
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-md-4 g-4 pb-4">
                {berita.data.map((item) => (
                  <div className="col" key={item.id}>
                    <div
                      className="card border-0 rounded-4 shadow"
                      style={{ width: "19rem" }}
                    >
                      <Link className="text-decoration-none">
                        <ImgCard img={item.gambar} is_berita={true} />
                      </Link>
                      <div className="card-body">
                        <div className="card-text p-2">
                          <Heading color={"text-blue"} size={"fs-4 mb-1"}>
                            <Link className="text-decoration-none text-dark">
                              {capitalize(item.judul)}
                            </Link>
                          </Heading>
                          <div className="my-2">
                            <Description color={"text-secondary"}>
                              {item.kategori} |{" "}
                              {moment(item.created_at).format("DD MMMM YYYY")}
                            </Description>
                          </div>
                          <OrangeButton className="rounded-5">
                            Lebih Lanjut<span className="mx-2"></span>
                            <FaArrowRight className="mb-1" />
                          </OrangeButton>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Pagination links={berita.links} user={true} />
          </div>
        </div>
      </div>
    </SectionPage>
  );
}

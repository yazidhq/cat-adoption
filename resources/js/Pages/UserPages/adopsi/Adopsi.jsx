import React, { useEffect, useState } from "react";
import TextInput from "@/Components/TextInput";
import BlueButton from "@/Components/UserComponents/BlueButton";
import LinkButton from "@/Components/UserComponents/LinkButton";
import SectionPage from "@/Layouts/UserLayouts/SectionPage";
import { IoMdSearch } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import Heading from "@/Components/Heading";
import Description from "@/Components/Description";
import Pagination from "@/Components/Pagination";
import { CiHeart } from "react-icons/ci";
import { Link, router } from "@inertiajs/react";
import ImgCard from "@/Components/UserComponents/ImgCard";
import Swal from "sweetalert2";

export default function Adopsi({ auth, hewan, filters, adopted }) {
  const [lokasi, setLokasi] = useState(filters.lokasi || "");
  const [kelamin, setKelamin] = useState(filters.kelamin || "");
  const [usia, setUsia] = useState(filters.usia || "");
  const [kategori, setKategori] = useState(filters.kategori || "");
  const [activeCategory, setActiveCategory] = useState(filters.kategori || "");

  const handleSearch = (e) => {
    e.preventDefault();
    router.get(
      route(route().current()),
      {
        lokasi,
        kelamin,
        usia,
        kategori,
      },
      {
        preserveState: true,
        replace: true,
      }
    );
  };

  const resetSearch = () => {
    setLokasi("");
    setKelamin("");
    setUsia("");
    setKategori("");
    setActiveCategory("");
    router.get(
      route(route().current()),
      {},
      {
        preserveState: true,
        replace: true,
      }
    );
  };

  const handleCategoryClick = (category) => {
    setKategori(category);
    setActiveCategory(category);
    router.get(
      route(route().current()),
      {
        lokasi,
        kelamin,
        usia,
        kategori: category,
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

  useEffect(() => {
    if (adopted) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: adopted,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        router.reload({ preserveState: false });
      });
    }
  }, [adopted]);

  return (
    <SectionPage title={"Adopsi"} auth={auth}>
      <div className="pt-5">
        <div className="bg-orange pb-4">
          <div className="container">
            <div className="d-flex justify-content-between mb-2 pt-5">
              <div>
                <LinkButton
                  btnClick={resetSearch}
                  className={activeCategory === "" && "fw-bold"}
                  color={"text-dark"}
                >
                  Semua
                </LinkButton>
                <LinkButton
                  btnClick={() => handleCategoryClick("anjing")}
                  className={activeCategory === "anjing" && "fw-bold"}
                  color={"text-dark"}
                >
                  Anjing
                </LinkButton>
                <LinkButton
                  btnClick={() => handleCategoryClick("kucing")}
                  className={activeCategory === "kucing" && "fw-bold"}
                  color={"text-dark"}
                >
                  Kucing
                </LinkButton>
              </div>
              <div>
                <LinkButton btnClick={resetSearch}>RESET</LinkButton>
              </div>
            </div>
            <form action="" onSubmit={handleSearch}>
              <div className="row">
                <div className="col-md-6">
                  <TextInput
                    name="lokasi"
                    className="form-control"
                    placeholder="Cari lokasi"
                    value={lokasi}
                    onChange={(e) => setLokasi(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-4">
                      <select
                        name="kelamin"
                        className="form-control"
                        value={kelamin}
                        onChange={(e) => setKelamin(e.target.value)}
                      >
                        <option hidden value="">
                          Jenis Kelamin
                        </option>
                        <option value="jantan">Jantan</option>
                        <option value="betina">Betina</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <select
                        name="usia"
                        className="form-control"
                        value={usia}
                        onChange={(e) => setUsia(e.target.value)}
                      >
                        <option hidden value="">
                          Usia
                        </option>
                        <option value="11">0 - 11 Bulan</option>
                        <option value="60">1 - 5 Tahun</option>
                        <option value="120">6 - 10 Tahun</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <div className="d-grid">
                        <BlueButton type="submit">
                          <IoMdSearch />
                          <span className="mx-1"></span>
                          Cari Hewan
                        </BlueButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="py-4">
          <div className="container">
            {hewan.data.length === 0 ? (
              <div className="text-center">
                <h4 className="py-5">
                  OOPS.. NO <span className="fw-bold text-blue">PAW PAW</span>{" "}
                  FOUND!
                </h4>
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-md-4 g-4 pb-4">
                {hewan.data.map((item) => (
                  <div className="col" key={item.id}>
                    <div
                      className="card border-0 rounded-5 shadow"
                      style={{ width: "19rem" }}
                    >
                      <Link
                        href={route("detail_adopsi", item.id)}
                        className="text-decoration-none"
                      >
                        <ImgCard img={item.foto} shelterId={item.shelter_id} />
                      </Link>
                      <div className="card-body">
                        <div className="card-text p-2">
                          <Heading color={"text-blue"} size={"fs-4 mb-1"}>
                            <div className="d-flex justify-content-between">
                              <Link
                                href={route("detail_adopsi", item.id)}
                                className="text-decoration-none text-blue"
                              >
                                {capitalize(item.nama)}
                              </Link>
                              <Link>
                                <CiHeart className="fs-2" />
                              </Link>
                            </div>
                          </Heading>
                          <Description size={"mb-0"}>
                            Jenis Kelamin : {capitalize(item.kelamin)}
                          </Description>
                          <Description size={"mb-0"}>
                            Usia : {item.usia} Bulan
                          </Description>
                          <Description size={"text-muted mb-0 mt-2"}>
                            <FaLocationDot /> {capitalize(item.kota)},{" "}
                            {capitalize(item.provinsi)}
                          </Description>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Pagination links={hewan.links} user={true} />
          </div>
        </div>
      </div>
    </SectionPage>
  );
}

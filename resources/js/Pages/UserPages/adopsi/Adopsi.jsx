import React, { useState } from "react";
import TextInput from "@/Components/TextInput";
import BlueButton from "@/Components/UserComponents/BlueButton";
import LinkButton from "@/Components/UserComponents/LinkButton";
import SectionPage from "@/Layouts/UserLayouts/SectionPage";
import { IoMdSearch } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import Heading from "@/Components/Heading";
import Description from "@/Components/Description";
import Img from "@/Components/Img";
import Pagination from "@/Components/Pagination";
import { CiHeart } from "react-icons/ci";
import { Link } from "@inertiajs/react";

export default function Home({ auth, hewan }) {
  const [searchResult, setSearchResult] = useState(hewan.data);
  const [lokasi, setLokasi] = useState("");
  const [kelamin, setKelamin] = useState("");
  const [usia, setUsia] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const filteredHewan = hewan.data.filter((item) => {
      const provinsiLowerCase = item.provinsi.toLowerCase();
      const kotaLowerCase = item.kota.toLowerCase();
      const lokasiLowerCase = lokasi.toLowerCase();
      const kelaminFilter = kelamin.toLowerCase();
      const usiaFilter = parseInt(usia);

      const lokasiMatch =
        provinsiLowerCase.includes(lokasiLowerCase) ||
        kotaLowerCase.includes(lokasiLowerCase);

      const kelaminMatch = kelaminFilter
        ? item.kelamin.toLowerCase() === kelaminFilter
        : true;

      const usiaMatch = usiaFilter
        ? (usiaFilter === 11 && item.usia <= 11) ||
          (usiaFilter === 60 && item.usia >= 11 && item.usia <= 60) ||
          (usiaFilter === 120 && item.usia >= 61 && item.usia <= 120)
        : true;

      return lokasiMatch && kelaminMatch && usiaMatch;
    });

    setSearchResult(filteredHewan);
  };

  const resetSearch = () => {
    setSearchResult(hewan.data);
    setLokasi("");
    setKelamin("");
    setUsia("");
  };

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <SectionPage title={"Adopsi"} auth={auth}>
      <div className="pt-5">
        <div className="bg-orange pb-4">
          <div className="container">
            <div className="d-flex justify-content-between mb-2 pt-5">
              <div>
                <LinkButton>Semua</LinkButton>
                <LinkButton>Anjing</LinkButton>
                <LinkButton>Kucing</LinkButton>
              </div>
              <div>
                <LinkButton btnClick={resetSearch}>RESET</LinkButton>
              </div>
            </div>
            <form action="" onSubmit={(e) => handleSearch(e)}>
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
            <div className="row row-cols-1 row-cols-md-4 g-4 pb-4">
              {searchResult.map((item) => (
                <div className="col" key={item.id}>
                  <div
                    className="card border-0 rounded-5 shadow"
                    style={{ width: "19rem" }}
                  >
                    <Link
                      href={route("detail_adopsi", item.id)}
                      className="text-decoration-none"
                    >
                      <div
                        className="position-relative"
                        style={{ width: "100%", paddingTop: "90%" }}
                      >
                        <Img
                          src={`/hewan-img/${item.foto}`}
                          className="img-fluid position-absolute top-0 start-0 w-100 h-100 object-fit-cover rounded-top-5"
                        />
                        {item.user_id && (
                          <Img
                            src={`/core-img/is_user.png`}
                            className="position-absolute py-3 px-3 mt-3 mx-3 rounded-4"
                            style={{
                              top: "10px",
                              right: "10px",
                              backgroundColor: "rgba(30, 30, 30, 0.7)",
                            }}
                          />
                        )}
                      </div>
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
            <Pagination links={hewan.links} />
          </div>
        </div>
      </div>
    </SectionPage>
  );
}

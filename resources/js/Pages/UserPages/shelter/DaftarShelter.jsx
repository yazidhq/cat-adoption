import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { FaLocationDot } from "react-icons/fa6";
import Heading from "@/Components/Heading";
import Img from "@/Components/Img";
import SectionPage from "@/Layouts/UserLayouts/SectionPage";
import OrangeButton from "@/Components/UserComponents/OrangeButton";
import BlueButton from "@/Components/UserComponents/BlueButton";
import Pagination from "@/Components/Pagination";
import { FaPhoneAlt } from "react-icons/fa";
import { RiHomeHeartFill } from "react-icons/ri";
import TextInput from "@/Components/TextInput";
import { IoMdSearch } from "react-icons/io";

export default function DaftarShelter({ auth, shelters, filters }) {
  const [nama_lokasi, setNama_lokasi] = useState(filters.nama_lokasi || "");
  const [khusus, setKhusus] = useState(filters.khusus || "");

  const handleSearch = (e) => {
    e.preventDefault();
    router.get(
      route(route().current()),
      {
        nama_lokasi,
        khusus,
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

  return (
    <SectionPage title={"Daftar Shelter"} auth={auth}>
      <div className=" pt-5">
        <div className="bg-orange pb-5 pt-5">
          <div className="container pt-4">
            <form onSubmit={handleSearch}>
              <div className="row">
                <div className="col-md-7">
                  <TextInput
                    name="nama_lokasi"
                    className="form-control"
                    placeholder="Cari Nama, lokasi shelter"
                    value={nama_lokasi}
                    onChange={(e) => setNama_lokasi(e.target.value)}
                  />
                </div>
                <div className="col-md-5">
                  <div className="row">
                    <div className="col-md-8">
                      <select
                        name="khusus"
                        className="form-control"
                        value={khusus}
                        onChange={(e) => setKhusus(e.target.value)}
                      >
                        <option hidden value="">
                          Tipe Shelter
                        </option>
                        <option value="kucing">Khusus Kucing</option>
                        <option value="anjing">Khusus Anjing</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <div className="d-grid">
                        <BlueButton type="submit">
                          <IoMdSearch />
                          <span className="mx-1"></span>
                          Cari Shelter
                        </BlueButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-light">
        <div className="container py-5">
          {shelters.data.length === 0 ? (
            <div className="text-center">
              <h4 className="py-5">
                OOPS.. NO <span className="fw-bold text-blue">SHELTER</span>{" "}
                FOUND!
              </h4>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2">
              {shelters.data.map((item) => (
                <div className="col" key={item.id}>
                  <div className="bg-white p-4 shadow-sm border-2 rounded-5">
                    <div className="row">
                      <div className="col-md-5">
                        <div className="square-img">
                          <Img
                            src={`/shelter-img/${item.foto}`}
                            alt={item.nama}
                            classes="rounded-4"
                          />
                        </div>
                      </div>
                      <div className="col-md-7">
                        <Heading size={"fs-4"} color={"text-blue"}>
                          {capitalize(item.nama)}
                        </Heading>
                        <Heading size={"fs-6 mt-3"}>
                          <FaLocationDot /> <span className="mx-1"></span>{" "}
                          {capitalize(item.kota)}, {capitalize(item.provinsi)}
                        </Heading>
                        <Heading size={"fs-6"}>
                          <FaPhoneAlt /> <span className="mx-1"></span>{" "}
                          {capitalize(item.nomor_wa)}
                        </Heading>
                        <Heading size={"fs-6"}>
                          <RiHomeHeartFill /> <span className="mx-1"></span>{" "}
                          Khusus {capitalize(item.khusus)}
                        </Heading>
                        <div className="mt-3">
                          <Link href={route("shelter_profile", item.id)}>
                            <OrangeButton>Lihat Shelter</OrangeButton>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="pb-5">
          <Pagination links={shelters.links} user={true} />
        </div>
      </div>
    </SectionPage>
  );
}

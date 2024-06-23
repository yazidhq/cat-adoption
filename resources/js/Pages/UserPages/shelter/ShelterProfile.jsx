import React from "react";
import { Link, router } from "@inertiajs/react";
import { IoShareSocial } from "react-icons/io5";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
  FaLocationDot,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa6";
import Heading from "@/Components/Heading";
import Img from "@/Components/Img";
import SosmedButton from "@/Components/UserComponents/SosmedButton";
import SectionPage from "@/Layouts/UserLayouts/SectionPage";
import OrangeButton from "@/Components/UserComponents/OrangeButton";
import BlueButton from "@/Components/UserComponents/BlueButton";
import ImgCard from "@/Components/UserComponents/ImgCard";
import Description from "@/Components/Description";
import Pagination from "@/Components/Pagination";

export default function ShelterProfile({ auth, shelter, hewan }) {
  const handleLokasi = () => {
    if (!auth.user) {
      router.get(route("login"));
    } else {
      const address = `${shelter.kota}, ${shelter.provinsi}, ${shelter.alamat}`;
      const formattedAddress = encodeURIComponent(address);
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;

      window.open(googleMapsUrl, "_blank");
    }
  };

  const handleHubungi = () => {
    if (!auth.user) {
      router.get(route("login"));
    } else {
      const whatsappUrl = `https://wa.me/${shelter.nomor_wa}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <SectionPage title={"Shelter Profile"} auth={auth}>
      <div className="bg-light pt-5 my-5">
        <div className="bg-white shadow-sm border">
          <div className="container py-5">
            <div className="row">
              <div className="col-lg-6">
                <Heading color={"text-blue"}>
                  {shelter.nama} (Khusus {capitalize(shelter.khusus)})
                </Heading>
                <Heading size={"fs-5 mt-5 mb-3"}>Deskripsi</Heading>
                <p
                  dangerouslySetInnerHTML={{
                    __html: shelter.deskripsi,
                  }}
                ></p>
                <div>
                  <OrangeButton onClick={handleHubungi}>
                    <FaWhatsapp className="fs-4" />
                    <span className="mx-1"></span>
                    Hubungi Sekarang
                  </OrangeButton>
                  <span className="mx-2"></span>
                  <BlueButton onClick={handleLokasi}>
                    <FaLocationDot className="fs-4" />
                    <span className="mx-1"></span>
                    Lokasi Shelter
                  </BlueButton>
                </div>
              </div>
              <div className="col-lg-6">
                <Img
                  src={`/shelter-img/${shelter.foto}`}
                  width={"100%"}
                  classes="rounded-4"
                />
                <div className="d-flex justify-content-end gap-2 mt-4">
                  <SosmedButton icon={<IoShareSocial />} />
                  <SosmedButton icon={<FaInstagram />} />
                  <SosmedButton icon={<FaFacebookF />} />
                  <SosmedButton icon={<FaYoutube />} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <Heading color={"text-blue text-center mb-5"}>
          Hewan yang masih ada di shelter saat ini
        </Heading>
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
                          {auth.user &&
                          item.favorite.some(
                            (fav) => fav.user_id === auth.user.id
                          ) ? (
                            <Link
                              href={route("hapus_favorite", item.id)}
                              method="post"
                              className="text-blue"
                            >
                              <FaHeart className="fs-3" />
                            </Link>
                          ) : (
                            <Link
                              href={route("tambah_favorite", item.id)}
                              method="post"
                              className="text-blue"
                            >
                              <FaRegHeart className="fs-3" />
                            </Link>
                          )}
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
        <div className="mb-5">
          <Pagination links={hewan.links} user={true} />
        </div>
      </div>
    </SectionPage>
  );
}

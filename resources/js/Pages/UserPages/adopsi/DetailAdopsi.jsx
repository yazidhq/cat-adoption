import Heading from "@/Components/Heading";
import Img from "@/Components/Img";
import BlueButton from "@/Components/UserComponents/BlueButton";
import BlueOutlineButton from "@/Components/UserComponents/BlueOutlineButton";
import CircleImg from "@/Components/UserComponents/CircleImg";
import ImgCard from "@/Components/UserComponents/ImgCard";
import OrangeButton from "@/Components/UserComponents/OrangeButton";
import OrangeOutlineButton from "@/Components/UserComponents/OrangeOutlineButton";
import SosmedButton from "@/Components/UserComponents/SosmedButton";
import SectionPage from "@/Layouts/UserLayouts/SectionPage";
import { IoShareSocial } from "react-icons/io5";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa6";
import { Link } from "@inertiajs/react";

export default function DetailAdopsi({ auth, hewan }) {
  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const formatToRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <SectionPage title={"Detail Adopsi"} auth={auth}>
      <div className="bg-light pt-5">
        <div className="container py-5">
          <div className="row row-cols-1 row-cols-md-2 g-4">
            <div className="col">
              <ImgCard img={hewan.foto} is_detail={true} />
            </div>
            <div className="col">
              <div className="rounded-4 shadow h-100">
                <div className="px-4 py-5 h-100 d-flex flex-column justify-content-between">
                  <div className="mx-3">
                    <Heading color={"text-blue d-flex align-items-center"}>
                      {hewan.shelter_id && (
                        <div>
                          <Img
                            src={`/core-img/is_user.png`}
                            className="py-2 px-2 rounded-3"
                            style={{
                              backgroundColor: "rgba(30, 30, 30, 0.7)",
                            }}
                          />
                          <span className="mx-2"></span>
                        </div>
                      )}
                      <div className="mt-1">
                        {capitalize(hewan.nama)} ( {capitalize(hewan.kategori)}{" "}
                        {capitalize(hewan.jenis_hewan)} )
                      </div>
                    </Heading>
                    <Heading size={"fs-4 mt-4"} color={"text-dark-orange"}>
                      Biaya Adopsi : {formatToRupiah(hewan.biaya)}
                    </Heading>
                    <hr />
                    <div className="d-flex mt-4">
                      <div className="col-md-5">
                        <p className="fw-bold">Jenis Kelamin</p>
                        <p className="fw-bold">Usia</p>
                        <p className="fw-bold">Berat Badan</p>
                        <p className="fw-bold">Steril</p>
                        <p className="fw-bold">Vaksin</p>
                        <p className="fw-bold">Lokasi</p>
                      </div>
                      <div className="col-md-7">
                        <p>{capitalize(hewan.kelamin)}</p>
                        <p>{hewan.usia} Bulan</p>
                        <p>{hewan.berat_badan} Gram</p>
                        <p>
                          {hewan.steril ? "Sudah Disteril" : "Belum Disteril"}
                        </p>
                        <p>
                          {hewan.vaksin ? "Sudah Divaksin" : "Belum Divaksin"}
                        </p>
                        <p>
                          {hewan.shelter_id
                            ? hewan.shelter.alamat
                            : hewan.user.alamat}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-3 mt-5 mx-3">
                    <Link href={route("pendaftaran_adopsi")}>
                      <OrangeButton>ADOPSI SEKARANG</OrangeButton>
                    </Link>
                    <OrangeOutlineButton>TAMBAH FAVORIT</OrangeOutlineButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-4 shadow mt-5">
            <div className="p-4 px-5">
              <div className="d-flex justify-content-between">
                <div className="d-flex gap-4">
                  <CircleImg
                    img={
                      hewan.shelter_id
                        ? `/shelter-img/${hewan.shelter.foto}`
                        : `/core-img/default-profile.jpg`
                    }
                    width={"100px"}
                  />
                  <div className="d-flex flex-column justify-content-center">
                    <Heading size={"fs-4"}>
                      {capitalize(
                        hewan.shelter_id ? hewan.shelter.nama : hewan.user.name
                      )}
                    </Heading>
                    <div className="d-flex gap-2">
                      <BlueButton>Lokasi</BlueButton>
                      <BlueOutlineButton>Hubungi</BlueOutlineButton>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <SosmedButton icon={<IoShareSocial />} />
                  <SosmedButton icon={<FaInstagram />} />
                  <SosmedButton icon={<FaFacebookF />} />
                  <SosmedButton icon={<FaYoutube />} />
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-4 shadow mt-5">
            <div className="p-4 px-5">
              <Heading size={"fs-4"}>Syarat & Ketentuan</Heading>
              <p
                style={{ textAlign: "justify" }}
                dangerouslySetInnerHTML={{
                  __html: hewan.syarat_ketentuan,
                }}
              ></p>
              <Heading size={"fs-4 mt-4"}>Deskripsi</Heading>
              <p
                style={{ textAlign: "justify" }}
                dangerouslySetInnerHTML={{ __html: hewan.deskripsi }}
              />
            </div>
          </div>
        </div>
      </div>
    </SectionPage>
  );
}

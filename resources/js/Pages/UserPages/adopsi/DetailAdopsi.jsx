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
import { Link, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import OrangeRdButton from "@/Components/UserComponents/OrangeRdButton";
import OrangeRdOutlineButton from "@/Components/UserComponents/OrangeRdOutlineButton";
import { FaCircleCheck } from "react-icons/fa6";

export default function DetailAdopsi({
  auth,
  hewan,
  owned,
  successMessage,
  errorMessage,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (successMessage || errorMessage) {
      setModalVisible(true);
    }
  }, [successMessage, errorMessage]);

  const handleBack = () => {
    setModalVisible(false);
    router.get(route("detail_adopsi", hewan.id));
  };

  const handleCheckStatus = () => {
    setModalVisible(false);
    router.get(route("status_adopsi"));
  };

  useEffect(() => {
    if (owned) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: owned,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        router.reload({ preserveState: false });
      });
    }
  }, [owned]);

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
                    {auth.user && (
                      <>
                        {hewan.user_id === auth.user.id ? (
                          <Heading
                            size={"fs-6"}
                            color={
                              "text-blue  bg-light border px-3 py-2 rounded-4"
                            }
                          >
                            {hewan.kategori.toUpperCase()} INI MILIK ANDA
                          </Heading>
                        ) : (
                          !hewan.is_adopsi && (
                            <>
                              <Link
                                href={route("pendaftaran_adopsi", hewan.id)}
                              >
                                <OrangeButton>ADOPSI SEKARANG</OrangeButton>
                              </Link>
                              <OrangeOutlineButton>
                                TAMBAH FAVORIT
                              </OrangeOutlineButton>
                            </>
                          )
                        )}
                        {hewan.is_adopsi ? (
                          <Heading
                            size={"fs-6"}
                            color={
                              "text-dark-orange bg-light border px-3 py-2 rounded-4"
                            }
                          >
                            {hewan.kategori.toUpperCase()} INI SUDAH DIADOPSI
                          </Heading>
                        ) : null}
                      </>
                    )}
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
                        : auth.user && auth.user.foto
                        ? `/user-img/${hewan.user.foto}`
                        : `/core-img/default-profile.jpg`
                    }
                    width={"100px"}
                  />
                  <div className="d-flex flex-column justify-content-center">
                    <Heading size={"fs-4"}>
                      {(hewan.shelter_id
                        ? hewan.shelter.nama
                        : hewan.user.nama_depan + " " + hewan.user.nama_belakang
                      ).toUpperCase()}
                    </Heading>
                    <div className="d-flex gap-2">
                      {auth.user && hewan.user_id === auth.user.id ? (
                        <Link href={route("user_profile")}>
                          <BlueButton>My Profile</BlueButton>
                        </Link>
                      ) : (
                        <>
                          <BlueButton>Lokasi</BlueButton>
                          <BlueOutlineButton>Hubungi</BlueOutlineButton>
                        </>
                      )}
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

      {modalVisible && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content border-0 shadow rounded-5">
              <div className="modal-body p-5">
                <div className="d-flex justify-content-center mb-4">
                  <FaCircleCheck
                    className="text-blue"
                    style={{ fontSize: "7rem" }}
                  />
                </div>
                <Heading size={"fs-4 text-center mb-2 text-blue"}>
                  Berhasil Terkirim
                </Heading>
                <Heading size={"fs-6 text-center mb-5"}>
                  {successMessage || errorMessage}
                </Heading>
                <div className="d-grid d-flex flex-column gap-3">
                  <OrangeRdButton onClick={handleCheckStatus}>
                    Cek Status Adopsi
                  </OrangeRdButton>
                  <OrangeRdOutlineButton onClick={handleBack}>
                    Kembali
                  </OrangeRdOutlineButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </SectionPage>
  );
}

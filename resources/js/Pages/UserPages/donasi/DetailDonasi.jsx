import Description from "@/Components/Description";
import Heading from "@/Components/Heading";
import Img from "@/Components/Img";
import BlueButton from "@/Components/UserComponents/BlueButton";
import BlueOutlineButton from "@/Components/UserComponents/BlueOutlineButton";
import ImgCard from "@/Components/UserComponents/ImgCard";
import OrangeButton from "@/Components/UserComponents/OrangeButton";
import OrangeRdButton from "@/Components/UserComponents/OrangeRdButton";
import SectionPage from "@/Layouts/UserLayouts/SectionPage";
import { Link, router } from "@inertiajs/react";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import Swal from "sweetalert2";

export default function DetailDonasi({
  auth,
  donasi,
  daftar_donasi,
  successMessage,
  successPayMessage,
  snapToken,
  total_donasi,
}) {
  const [nominal, setNominal] = useState("");
  const [tipeDonasi, setTipeDonasi] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDonate = () => {
    if (!nominal || !tipeDonasi) {
      setErrorMessage("Anda harus memilih nominal dan tipe donasi.");
      return;
    }

    const data = {
      user_id: auth.user && auth.user.id,
      donasi_id: donasi.id,
      dana: nominal,
      tipe_donasi: tipeDonasi,
    };

    router.post(route("proses_buat_transaksi", data.donasi_id), data);
  };

  useEffect(() => {
    if (successMessage || successPayMessage) {
      Swal.fire({
        title: "Terimakasih",
        text: successMessage ? successMessage : successPayMessage,
        icon: "success",
        showCancelButton: true,
        confirmButtonText: successMessage ? "Bayar Sekarang" : "Lihat Lainnya",
        cancelButtonText: "Lihat Donasimu",
      }).then((result) => {
        if (result.isConfirmed) {
          successMessage
            ? snap.pay(snapToken, {
                onSuccess: function (result) {
                  router.post(route("proses_pembayaran_berhasil", snapToken));
                },
              })
            : router.get(route("daftar_donasi"));
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          router.get(route("donasi_saya"));
        }
      });
    }
  }, [successMessage, successPayMessage]);

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const formatToRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <SectionPage title={"Detail Donasi"} auth={auth}>
      <div className="bg-light pt-5">
        <div className="container py-5">
          <div className="row row-cols-1 row-cols-lg-2 g-0 d-flex">
            <div className="col d-flex position-relative">
              <ImgCard
                img={donasi.gambar}
                is_detail={true}
                is_detail_donasi={"true"}
                className="flex-fill"
              />
              <div
                className="position-absolute"
                style={{ bottom: "25px", left: "25px", right: "25px" }}
              >
                <div className="text-dark bg-white bg-opacity-75 p-4 rounded-4">
                  <Img
                    src={"/core-img/flex-logo.png"}
                    width={"120px"}
                    classes="mb-4"
                  />
                  <Heading size={"fs-5"}>
                    {capitalize(donasi.tema_donasi)}
                  </Heading>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: donasi.deskripsi,
                    }}
                  ></p>
                </div>
              </div>
            </div>
            <div className="col d-flex">
              <div className="rounded-end-4 shadow h-100 flex-fill d-flex flex-column">
                <div className="px-4 py-4 h-100 flex-grow-1 d-flex flex-column">
                  {errorMessage && (
                    <div className="px-2">
                      <div className="alert alert-danger">{errorMessage}</div>
                    </div>
                  )}
                  <div className="row row-cols-1 row-cols-md-3 px-2 py-3 g-3">
                    <div className="col">
                      <div className="d-grid">
                        <BlueOutlineButton onClick={() => setNominal(10000)}>
                          Rp. 10.000
                        </BlueOutlineButton>
                      </div>
                    </div>
                    <div className="col">
                      <div className="d-grid">
                        <BlueOutlineButton onClick={() => setNominal(20000)}>
                          Rp. 20.000
                        </BlueOutlineButton>
                      </div>
                    </div>
                    <div className="col">
                      <div className="d-grid">
                        <BlueOutlineButton onClick={() => setNominal(50000)}>
                          Rp. 50.000
                        </BlueOutlineButton>
                      </div>
                    </div>
                    <div className="col">
                      <div className="d-grid">
                        <BlueOutlineButton onClick={() => setNominal(100000)}>
                          Rp. 100.000
                        </BlueOutlineButton>
                      </div>
                    </div>
                    <div className="col">
                      <div className="d-grid">
                        <BlueOutlineButton onClick={() => setNominal(150000)}>
                          Rp. 150.000
                        </BlueOutlineButton>
                      </div>
                    </div>
                    <div className="col">
                      <div className="d-grid">
                        <BlueOutlineButton onClick={() => setNominal(200000)}>
                          Rp. 200.000
                        </BlueOutlineButton>
                      </div>
                    </div>
                    <div className="input-group mb-3 mt-5">
                      <span
                        className="input-group-text border-blue bg-blue text-white"
                        id="basic-addon1"
                      >
                        <strong>Rp.</strong>
                      </span>
                      <input
                        type="text"
                        className="form-control border-blue"
                        placeholder="Nominal Lainnya"
                        aria-label="Nominal Lainnya"
                        aria-describedby="basic-addon1"
                        value={nominal}
                        onChange={(e) => setNominal(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Description color={"px-2"}>
                      Pilih tipe donasi untuk Hewan
                    </Description>
                    <div className="row row-cols-1 row-cols-md-3 px-2 py-3 g-3">
                      <div className="col">
                        <div className="d-grid">
                          {tipeDonasi === "pengobatan" ? (
                            <BlueButton
                              onClick={() => setTipeDonasi("pengobatan")}
                            >
                              Pengobatan
                            </BlueButton>
                          ) : (
                            <BlueOutlineButton
                              onClick={() => setTipeDonasi("pengobatan")}
                            >
                              Pengobatan
                            </BlueOutlineButton>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="d-grid">
                          {tipeDonasi === "makanan" ? (
                            <BlueButton
                              onClick={() => setTipeDonasi("makanan")}
                            >
                              Makanan
                            </BlueButton>
                          ) : (
                            <BlueOutlineButton
                              onClick={() => setTipeDonasi("makanan")}
                            >
                              Makanan
                            </BlueOutlineButton>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className="d-grid">
                          {tipeDonasi === "kesehatan" ? (
                            <BlueButton
                              onClick={() => setTipeDonasi("kesehatan")}
                            >
                              Kesehatan
                            </BlueButton>
                          ) : (
                            <BlueOutlineButton
                              onClick={() => setTipeDonasi("kesehatan")}
                            >
                              Kesehatan
                            </BlueOutlineButton>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Description color={"px-2 mt-4"}>Isi data diri</Description>
                    <div className="d-grid px-2 mt-2">
                      <input
                        type="text"
                        className="form-control border-blue"
                        placeholder="Nama Lengkap"
                        defaultValue={
                          auth.user &&
                          auth.user.nama_depan + " " + auth.user.nama_belakang
                        }
                        disabled={auth.user && true}
                      />
                      <input
                        type="text"
                        className="form-control border-blue mt-2"
                        placeholder="Alamat Email"
                        defaultValue={auth.user && auth.user.email}
                        disabled={auth.user && true}
                      />
                      <input
                        type="text"
                        className="form-control border-blue mt-2"
                        placeholder="Nomor Telepon"
                        defaultValue={auth.user && auth.user.nomor_wa}
                        disabled={auth.user && true}
                      />
                    </div>
                  </div>
                  <div className="px-2 my-5">
                    <div className="row">
                      <div className="col-md-6">
                        <Description size={"fw-medium mb-2"}>
                          Target Dana Terkumpul
                        </Description>
                      </div>
                      <div className="col-md-6 d-flex justify-content-end">
                        <Description size={"fw-medium mb-2"}>
                          {formatToRupiah(total_donasi)}/
                          {formatToRupiah(donasi.target_dana)}
                        </Description>
                      </div>
                    </div>
                    <div
                      className="progress"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={(total_donasi / donasi.target_dana) * 100}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        className="progress-bar"
                        style={{
                          width: `${
                            (total_donasi / donasi.target_dana) * 100
                          }%`,
                        }}
                      >
                        {((total_donasi / donasi.target_dana) * 100).toFixed(2)}
                        %
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto px-2 d-grid">
                    <OrangeRdButton onClick={handleDonate}>
                      Donasi Sekarang
                    </OrangeRdButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Heading size={"fs-1 text-center"} color={"text-blue my-5 pt-4"}>
            Informasi Seputar Penyaluran Donasi
          </Heading>
          {daftar_donasi.length === 0 ? (
            <div className="text-center">
              <h4 className="py-5">
                OOPS.. NO <span className="fw-bold text-blue">DONASI</span>{" "}
                FOUND!
              </h4>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-4">
              {daftar_donasi.map((item) => (
                <div className="col" key={item.id}>
                  <div className="card border-0 rounded-4 shadow">
                    <Link
                      href={route("detail_donasi", item.id)}
                      className="text-decoration-none"
                    >
                      <ImgCard img={item.gambar} is_donasi={true} />
                    </Link>
                    <div className="card-body">
                      <div className="card-text p-2">
                        <div className="mb-1" style={{ fontSize: "0.90rem" }}>
                          <Description color={"text-secondary"}>
                            {capitalize(item.tema_donasi)}
                          </Description>
                        </div>
                        <Heading size={"fs-6 mb-0"}>
                          <div className="d-flex justify-content-between">
                            <Link
                              href={route("detail_donasi", item.id)}
                              className="text-decoration-none text-dark"
                            >
                              <p
                                className="text-justify"
                                dangerouslySetInnerHTML={{
                                  __html: truncateText(item.deskripsi, 12),
                                }}
                              ></p>
                            </Link>
                          </div>
                        </Heading>
                        <div style={{ fontSize: "0.90rem" }}>
                          <Description color={"text-secondary"}>
                            {moment(item.created_at).format("DD MMMM YYYY")}
                          </Description>
                        </div>
                        <div className="mt-3">
                          <Link
                            href={route("detail_donasi", item.id)}
                            className="text-decoration-none text-dark"
                          >
                            <OrangeButton>
                              Lebih Lanjut<span className="mx-2"></span>
                              <FaArrowRight className="mb-1" />
                            </OrangeButton>
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
      </div>
    </SectionPage>
  );
}

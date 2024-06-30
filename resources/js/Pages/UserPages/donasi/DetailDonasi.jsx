import Description from "@/Components/Description";
import Heading from "@/Components/Heading";
import Img from "@/Components/Img";
import BlueOutlineButton from "@/Components/UserComponents/BlueOutlineButton";
import ImgCard from "@/Components/UserComponents/ImgCard";
import OrangeButton from "@/Components/UserComponents/OrangeButton";
import OrangeRdButton from "@/Components/UserComponents/OrangeRdButton";
import SectionPage from "@/Layouts/UserLayouts/SectionPage";
import { Link } from "@inertiajs/react";
import moment from "moment/moment";
import { FaArrowRight } from "react-icons/fa6";

export default function DetailDonasi({ auth, donasi, daftar_donasi }) {
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
                  <div className="row row-cols-1 row-cols-md-3 px-2 py-3 g-3">
                    <div className="col">
                      <div className="d-grid">
                        <BlueOutlineButton>Rp. 10.000</BlueOutlineButton>
                      </div>
                    </div>
                    <div className="col">
                      <div className="d-grid">
                        <BlueOutlineButton>Rp. 20.000</BlueOutlineButton>
                      </div>
                    </div>
                    <div className="col">
                      <div className="d-grid">
                        <BlueOutlineButton>Rp. 50.000</BlueOutlineButton>
                      </div>
                    </div>
                    <div className="col">
                      <div className="d-grid">
                        <BlueOutlineButton>Rp. 100.000</BlueOutlineButton>
                      </div>
                    </div>
                    <div className="col">
                      <div className="d-grid">
                        <BlueOutlineButton>Rp. 150.000</BlueOutlineButton>
                      </div>
                    </div>
                    <div className="col">
                      <div className="d-grid">
                        <BlueOutlineButton>Rp. 200.000</BlueOutlineButton>
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
                        aria-label="Username"
                        aria-describedby="basic-addon1"
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
                          <BlueOutlineButton>Rp. 200.000</BlueOutlineButton>
                        </div>
                      </div>
                      <div className="col">
                        <div className="d-grid">
                          <BlueOutlineButton>Rp. 200.000</BlueOutlineButton>
                        </div>
                      </div>
                      <div className="col">
                        <div className="d-grid">
                          <BlueOutlineButton>Rp. 200.000</BlueOutlineButton>
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
                  <div className="mt-auto px-2 d-grid">
                    <OrangeRdButton>Donasi Sekarang</OrangeRdButton>
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

import { Link } from "@inertiajs/react";
import Heading from "@/Components/Heading";
import SectionPage from "@/Layouts/UserLayouts/SectionPage";
import OrangeButton from "@/Components/UserComponents/OrangeButton";
import Pagination from "@/Components/Pagination";
import ImgCard from "@/Components/UserComponents/ImgCard";
import moment from "moment/moment";
import Description from "@/Components/Description";
import { FaArrowRight } from "react-icons/fa6";

export default function DaftarDonasi({ auth, donasi }) {
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
    <SectionPage title={"Daftar Donasi"} auth={auth}>
      <div className="pt-5">
        <div className="bg-dark-orange pb-4 pt-3">
          <div className="container pt-5">
            <Heading color={"text-white text-center"}>
              Informasi Seputar Penyaluran Donasi
            </Heading>
          </div>
        </div>
      </div>
      <div className="bg-light">
        <div className="container py-5">
          {donasi.data.length === 0 ? (
            <div className="text-center">
              <h4 className="py-5">
                OOPS.. NO <span className="fw-bold text-blue">DONASI</span>{" "}
                FOUND!
              </h4>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-4">
              {donasi.data.map((item) => (
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
        <div className="pb-5">
          <Pagination links={donasi.links} user={true} />
        </div>
      </div>
    </SectionPage>
  );
}

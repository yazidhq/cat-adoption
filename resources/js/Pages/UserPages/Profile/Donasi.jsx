import Heading from "@/Components/Heading";
import Pagination from "@/Components/Pagination";
import ImgCard from "@/Components/UserComponents/ImgCard";
import Profile from "@/Layouts/UserLayouts/Profile";
import { Link, router } from "@inertiajs/react";
import moment from "moment";
import BlueButton from "@/Components/UserComponents/BlueButton";
import Description from "@/Components/Description";
import OrangeButton from "@/Components/UserComponents/OrangeButton";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Donasi({ auth, donasi, successPayMessage }) {
  const handlePay = (snap_token) => {
    snap.pay(snap_token, {
      onSuccess: function (result) {
        router.post(route("proses_pembayaran_berhasil", snap_token));
      },
    });
  };

  useEffect(() => {
    if (successPayMessage) {
      Swal.fire({
        title: "Terimakasih",
        text: successPayMessage,
        icon: "success",
        confirmButtonText: "Lihat Daftar Donasi",
      }).then((result) => {
        if (result.isConfirmed) {
          router.get(route("daftar_donasi"));
        }
      });
    }
  }, [successPayMessage]);

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
    <Profile auth={auth} title={"Donasi"}>
      <div className="px-4 pb-4">
        <Heading color={"text-blue"}>
          Hai, {auth.user && capitalize(auth.user.nama_depan)}. berikut adalah
          daftar Donasimu.
        </Heading>
      </div>
      <div className="px-4">
        {donasi.data.length === 0 ? (
          <div className="text-center">
            <h4 className="py-5">
              OOPS.. YOU HAVE NO{" "}
              <span className="fw-bold text-blue">DONATION</span> YET!
            </h4>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-3 pb-4">
            {donasi.data.map((item) => (
              <div className="col" key={item.id}>
                <div className="card border-0 rounded-4 shadow">
                  <Link
                    href={route("detail_donasi", item.donasi.id)}
                    className="text-decoration-none"
                  >
                    <ImgCard img={item.donasi.gambar} is_donasi={true} />
                  </Link>
                  <div className="card-body">
                    <div className="card-text p-2">
                      <div className="mb-1" style={{ fontSize: "0.90rem" }}>
                        <Description color={"text-secondary"}>
                          {capitalize(item.donasi.tema_donasi)}
                        </Description>
                      </div>
                      <Heading size={"fs-6 mb-0"}>
                        <div className="d-flex justify-content-between">
                          <Link
                            href={route("detail_donasi", item.donasi.id)}
                            className="text-decoration-none text-dark"
                          >
                            <p
                              className="text-justify"
                              dangerouslySetInnerHTML={{
                                __html: truncateText(item.donasi.deskripsi, 12),
                              }}
                            ></p>
                          </Link>
                        </div>
                      </Heading>
                      <div style={{ fontSize: "0.90rem" }}>
                        <Description color={"text-secondary"}>
                          {moment(item.donasi.created_at).format(
                            "DD MMMM YYYY"
                          )}
                        </Description>
                      </div>
                      <div className="d-flex justify-content-between mt-3">
                        <Link
                          href={route("detail_donasi", item.donasi.id)}
                          className="text-decoration-none text-dark"
                        >
                          <OrangeButton>Lebih Lanjut</OrangeButton>
                        </Link>
                        {item.status == "done" ? (
                          <BlueButton disabled>Dibayar</BlueButton>
                        ) : (
                          <BlueButton
                            onClick={() => handlePay(item.snap_token)}
                          >
                            Bayar
                          </BlueButton>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Pagination links={donasi.links} user={true} />
      </div>
    </Profile>
  );
}

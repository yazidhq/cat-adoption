import Description from "@/Components/Description";
import Heading from "@/Components/Heading";
import Img from "@/Components/Img";
import ImgCard from "@/Components/UserComponents/ImgCard";
import LinkButton from "@/Components/UserComponents/LinkButton";
import OrangeButton from "@/Components/UserComponents/OrangeButton";
import Profile from "@/Layouts/UserLayouts/Profile";
import moment from "moment";
import "moment/locale/id";

export default function StatusAdopsi({ auth, adopsi }) {
  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  moment.updateLocale("id", {
    months: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
  });

  return (
    <Profile auth={auth} title={"Status Adposi"}>
      <div className="px-4 ">
        <div className="position-relative">
          <Img
            src={`/core-img/topbar.png`}
            className="img-fluid status_adopsi_img"
          />
          <div className="position-absolute top-0 start-0 pt-4 px-5 text-white">
            <Heading color={"text-dark"}>
              Hai, {capitalize(auth.user.nama_depan)}
            </Heading>
            <Description color={"text-dark"}>
              Kamu sudah menyelesaikan Langkah pertama.{" "}
            </Description>
          </div>
        </div>
        <div className="col-4 row row-cols-1 row-cols-lg-3 mt-3">
          <div className="col">
            <LinkButton color={"text-dark fw-bold"}>Proses</LinkButton>
          </div>
          <div className="col">
            <LinkButton color={"text-dark fw-bold"}>Diterima</LinkButton>
          </div>
          <div className="col">
            <LinkButton color={"text-dark fw-bold"}>Selesai</LinkButton>
          </div>
        </div>
        {adopsi.map((item) => (
          <div className="p-3 mx-2 border rounded-4 mb-3" key={item.id}>
            <div className="row">
              <div className="col-lg-3">
                <ImgCard
                  img={item.hewan.foto}
                  is_detail={true}
                  is_status={true}
                />
              </div>
              <div className="col-lg-7 mt-3">
                <Heading size={"fs-4"}>
                  {capitalize(item.hewan.nama)} ({" "}
                  {capitalize(item.hewan.kategori)}{" "}
                  {capitalize(item.hewan.jenis_hewan)} )
                </Heading>
                <Description>
                  {moment(item.created_at).format("DD MMMM YYYY")}
                  {item.created_at !== item.updated_at &&
                    " | " + moment(item.updated_at).format("DD MMMM YYYY")}
                </Description>
              </div>
              <div className="col-lg-2">
                <div className="mt-3">
                  <OrangeButton>
                    {item.status == "proses" && "Proses"}
                  </OrangeButton>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Profile>
  );
}

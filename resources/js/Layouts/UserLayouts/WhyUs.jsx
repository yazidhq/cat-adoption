import Description from "@/Components/Description";
import Heading from "@/Components/Heading";
import Img from "@/Components/Img";
import SuperHeading from "@/Components/SuperHeading";
import WhyUsList from "@/Components/WhyUsList";

export default function WhyUs() {
  return (
    <div className="container">
      <div className="py-5 mt-5">
        <div className="row">
          <div className="col-md-6">
            <Img src={"/core-img/why-us.png"} />
          </div>
          <div className="col-md-6 mt-5">
            <SuperHeading color={"text-blue"} size={"fs-2"}>
              Kenapa sih Harus Pilih REPAW?
            </SuperHeading>
            <div className="pt-5">
              <WhyUsList
                img={"/core-img/icon/hand-shake.png"}
                head={"Proses Adopsi yang Mudah"}
              >
                Menyediakan proses adopsi yang mudah dan transparan, dengan
                formulir dan panduan lengkap untuk membantu calon pemilik
                melewati proses dengan lancar.
              </WhyUsList>
              <WhyUsList
                img={"/core-img/icon/cat-dog.png"}
                head={"Pilihan Hewan yang Beragam"}
              >
                Menawarkan beragam hewan kucing dan anjing dari berbagai jenis,
                usia, dan latar belakang. Terjaminnya kondisi dan kesehatan
                hewan yang siap diadopsi.
              </WhyUsList>
              <WhyUsList
                img={"/core-img/icon/hand-heart.png"}
                head={"Memberi Kesejahteraan Hewan Terlantar"}
              >
                Menekankan pentingnya kesejahteraan hewan dan juga menyelamatkan
                hewan-hewan yang terlantar, melalui program donasi dan adopsi
                memastikan setiap hewan mendapatkan rumah yang aman dan nyaman.
              </WhyUsList>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

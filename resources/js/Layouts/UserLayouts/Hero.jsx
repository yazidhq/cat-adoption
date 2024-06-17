import Description from "@/Components/Description";
import Img from "@/Components/Img";
import RoundedBlueButton from "@/Components/RundedBlueButton";
import SuperHeading from "@/Components/SuperHeading";
import { IoSearch } from "react-icons/io5";

export default function Hero() {
  return (
    <div className="bg-orange-paw pt-5">
      <div className="pt-4">
        <div className="container">
          <div className="row flex-lg-row-reverse">
            <div className="col-lg-4">
              <div className="lc-block">
                <Img src={"/core-img/hero-img.png"} />
              </div>
            </div>
            <div className="col-lg-8 pt-5">
              <div className="mb-4 pt-5 mt-5">
                <SuperHeading>
                  Satu Langkah Kecil Kita <br /> Menyelamatkan Satu Kehidupan
                </SuperHeading>
              </div>
              <div className="mb-5">
                <Description size={"fs-5"}>
                  Mari bersama-sama memberikan mereka kesempatan hidup yang
                  layak dan membangun ikatan yang tak tergantikan dengan
                  menyambut mereka ke dalam keluarga Anda. Bersama, kita bisa
                  menjadi harapan bagi mereka!
                </Description>
              </div>
              <RoundedBlueButton>ADOPSI SEKARANG</RoundedBlueButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

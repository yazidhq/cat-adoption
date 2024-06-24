import Description from "@/Components/Description";
import Img from "@/Components/Img";
import RoundedBlueButton from "@/Components/RundedBlueButton";
import SuperHeading from "@/Components/SuperHeading";
import LinkButton from "@/Components/UserComponents/LinkButton";
import { Link } from "@inertiajs/react";
import EventContent from "./EventContent";

export default function Hero({ is_event }) {
  return (
    <div
      className={`${is_event ? "bg-dark-orange" : "bg-orange-paw"} pt-5 mt-3`}
    >
      <div className="pt-5">
        <div className="container">
          <div className="row flex-lg-row pb-5">
            <div className="col-lg-8 pt-4 pb-5">
              <div className="mb-4">
                {is_event ? (
                  <SuperHeading size={"display-3"} color={"text-white"}>
                    Welcome to Pet REPAWvent The Best Pet Adoption and
                    Exhibition Event!
                  </SuperHeading>
                ) : (
                  <SuperHeading>
                    Satu Langkah Kecil Kita <br /> Menyelamatkan Satu Kehidupan
                  </SuperHeading>
                )}
              </div>
              {!is_event && (
                <div className="mb-4">
                  <Description size={"fs-5"}>
                    Mari bersama-sama memberikan mereka kesempatan hidup yang
                    layak dan membangun ikatan yang tak tergantikan dengan
                    menyambut mereka ke dalam keluarga Anda. Bersama, kita bisa
                    menjadi harapan bagi mereka!
                  </Description>
                </div>
              )}
              {is_event ? (
                <Description size={"fs-3"} color={"text-white"}>
                  By Repaw
                </Description>
              ) : (
                <Link href={route("adopsi")}>
                  <RoundedBlueButton>ADOPSI SEKARANG</RoundedBlueButton>
                </Link>
              )}
            </div>
            <div className="col-lg-4">
              <div className="lc-block">
                {is_event ? null : <Img src={"/core-img/hero-img.png"} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

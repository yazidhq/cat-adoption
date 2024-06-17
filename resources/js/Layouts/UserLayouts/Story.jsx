import Description from "@/Components/Description";
import Heading from "@/Components/Heading";
import Img from "@/Components/Img";
import SuperHeading from "@/Components/SuperHeading";
import { FaLocationArrow } from "react-icons/fa";

export default function Story() {
  return (
    <div className="container">
      <div className="py-5 my-5 text-center">
        <div className="mb-5">
          <SuperHeading size={"fs-3 mb-0"} color={"text-dark-orange"}>
            MASIH RAGU UNTUK MULAI ADOPSI ?
          </SuperHeading>
          <Heading size={"fs-3"} color={"text-blue"}>
            Ini Cerita Mereka Tentang REPAW
          </Heading>
        </div>

        <div className="d-flex justify-content-center">
          <Img src={"/core-img/testimonial/1.png"} width={"300px"} />
          <Img src={"/core-img/testimonial/2.png"} width={"300px"} />
          <Img src={"/core-img/testimonial/3.png"} width={"300px"} />
        </div>
      </div>
    </div>
  );
}

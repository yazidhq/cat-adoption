import Description from "@/Components/Description";
import Heading from "@/Components/Heading";
import Img from "@/Components/Img";
import {
  FaFacebook,
  FaInstagram,
  FaLine,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";

export default function Footer() {
  return (
    <div className="bg-blue">
      <div className="container">
        <div className="row py-5">
          <div className="col-lg-4">
            <Img src={"/core-img/footer-logo.png"} />
          </div>
          <div className="col-lg-8">
            <div className="row">
              <div className="col-md-3 text-white">
                <Heading size={"fs-5"}>Layanan</Heading>
                <Description color={"mb-2"}>Adopsi</Description>
                <Description color={"mb-2"}>Donasi</Description>
                <Description color={"mb-2"}>Event</Description>
                <Description color={"mb-2"}>Informasi Shelter</Description>
                <Description color={"mb-2"}>Blog</Description>
              </div>
              <div className="col-md-3 text-white">
                <Heading size={"fs-5"}>Informasi</Heading>
                <Description color={"mb-2"}>Tentang Kami</Description>
                <Description color={"mb-2"}>Kebijakan REPAW</Description>
                <Description color={"mb-2"}>Kebijakan Privasi</Description>
              </div>
              <div className="col-md-3 text-white">
                <Heading size={"fs-5"}>Ikuti Kami</Heading>
                <Description color={"mb-2"}>
                  <FaFacebook /> Facebook
                </Description>
                <Description color={"mb-2"}>
                  {" "}
                  <FaInstagram /> Instagram
                </Description>
                <Description color={"mb-2"}>
                  <FaYoutube /> Youtube
                </Description>
              </div>
              <div className="col-md-3 text-white">
                <Heading size={"fs-5"}>Kontak Kami</Heading>
                <Description color={"mb-2"}>
                  {" "}
                  <FaWhatsapp /> Whatsapp
                </Description>
                <Description color={"mb-2"}>
                  <FaLine /> Line
                </Description>
                <Description color={"mb-2"}>
                  <MdOutlineMarkEmailRead /> cs@repaw.com Shelter
                </Description>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

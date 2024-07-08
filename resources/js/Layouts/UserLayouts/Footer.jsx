import Description from "@/Components/Description";
import Heading from "@/Components/Heading";
import Img from "@/Components/Img";
import { Link, usePage } from "@inertiajs/react";
import {
  FaFacebook,
  FaInstagram,
  FaLine,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";

export default function Footer() {
  const { paw_sosmed } = usePage().props;

  const normalizeUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) {
      return url;
    } else {
      return `https://${url}`;
    }
  };

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
                <Link
                  className="text-decoration-none text-white"
                  href={route("adopsi")}
                >
                  <Description color={"mb-2"}>Adopsi</Description>
                </Link>
                <Link
                  className="text-decoration-none text-white"
                  href={route("daftar_donasi")}
                >
                  <Description color={"mb-2"}>Donasi</Description>
                </Link>
                <Link
                  className="text-decoration-none text-white"
                  href={route("daftar_event")}
                >
                  <Description color={"mb-2"}>Event</Description>
                </Link>
                <Link
                  className="text-decoration-none text-white"
                  href={route("daftar_shelter")}
                >
                  <Description color={"mb-2"}>Informasi Shelter</Description>
                </Link>
                <Link
                  className="text-decoration-none text-white"
                  href={route("blog_berita")}
                >
                  <Description color={"mb-2"}>Blog</Description>
                </Link>
              </div>
              <div className="col-md-3 text-white">
                <Heading size={"fs-5"}>Informasi</Heading>
                <Link
                  className="text-decoration-none text-white"
                  href={route("blog_berita", { search: "Tentang Kami" })}
                >
                  <Description color={"mb-2"}>Tentang Kami</Description>
                </Link>
                <Link
                  className="text-decoration-none text-white"
                  href={route("blog_berita", { search: "Kebijakan REPAW" })}
                >
                  <Description color={"mb-2"}>Kebijakan REPAW</Description>
                </Link>
                <Link
                  className="text-decoration-none text-white"
                  href={route("blog_berita", { search: "Kebijakan Privasi" })}
                >
                  <Description color={"mb-2"}>Kebijakan Privasi</Description>
                </Link>
              </div>
              <div className="col-md-3 text-white">
                <Heading size="fs-5">Ikuti Kami</Heading>
                <Description color="mb-2">
                  <a
                    href={
                      paw_sosmed && paw_sosmed.fb
                        ? normalizeUrl(paw_sosmed.fb)
                        : ""
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-white"
                  >
                    <FaFacebook /> Facebook
                  </a>
                </Description>

                <Description color="mb-2">
                  <a
                    href={
                      paw_sosmed && paw_sosmed.ig
                        ? normalizeUrl(paw_sosmed.ig)
                        : ""
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-white"
                  >
                    <FaInstagram /> Instagram
                  </a>
                </Description>
                <Description color="mb-2">
                  <a
                    href={
                      paw_sosmed && paw_sosmed.yt
                        ? normalizeUrl(paw_sosmed.yt)
                        : ""
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-white"
                  >
                    <FaYoutube /> Youtube
                  </a>
                </Description>
              </div>
              <div className="col-md-3 text-white">
                <Heading size="fs-5">Kontak Kami</Heading>
                <Description color="mb-2">
                  <a
                    href={
                      paw_sosmed && paw_sosmed.wa
                        ? `https://wa.me/${paw_sosmed.wa}`
                        : ""
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-white"
                  >
                    <FaWhatsapp /> Whatsapp
                  </a>
                </Description>
                <Description color="mb-2">
                  <a
                    href={
                      paw_sosmed && paw_sosmed.line
                        ? normalizeUrl(paw_sosmed.line)
                        : ""
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-white"
                  >
                    <FaLine /> Line
                  </a>
                </Description>
                <Description color="mb-2">
                  <a
                    href={
                      paw_sosmed && paw_sosmed.email
                        ? `mailto:${paw_sosmed.email}`
                        : ""
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-white"
                  >
                    <MdOutlineMarkEmailRead />{" "}
                    {paw_sosmed && paw_sosmed.email
                      ? paw_sosmed.email
                      : "cs@repaw.com"}
                  </a>
                </Description>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

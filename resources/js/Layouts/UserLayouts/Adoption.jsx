import Description from "@/Components/Description";
import Heading from "@/Components/Heading";
import Img from "@/Components/Img";
import SuperHeading from "@/Components/SuperHeading";
import { FaLocationDot } from "react-icons/fa6";

export default function Adoption() {
  return (
    <div className="bg-orange-paw-list">
      <div className="container">
        <div className="py-5 mt-5">
          <div className="py-5">
            <div className="row py-5">
              <div className="col-md-5">
                <div className="mt-5">
                  <SuperHeading size={"fs-2"}>
                    SAMPAI SAAT INI MEREKA MASIH MENUNGGU UNTUK DIADOPSI !
                  </SuperHeading>
                  <div className="mt-4">
                    <Description>
                      Mereka tidak memiliki rumah, telah dicampakkan di jalanan,
                      atau ditinggalkan tanpa alasan yang jelas. Mereka mencari
                      cinta dan keamanan yang pantas mereka dapatkan. Sudah
                      saatnya kita memberi mereka kesempatan untuk merasakan
                      kasih sayang yang mereka rindukan.
                    </Description>
                  </div>
                  <div className="pt-5">
                    <Description>
                      Note: Tekan "SHIFT" dan scroll untuk geser ke-kanan.
                    </Description>
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div
                  style={{
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    padding: "1rem",
                    scrollbarColor: "rgba(0, 0, 0, 0) transparent",
                  }}
                >
                  <div
                    className="d-inline-block"
                    style={{ width: "18rem", marginRight: "1rem" }}
                  >
                    <div
                      className="card border-0 rounded-5"
                      style={{ width: "18rem" }}
                    >
                      <Img
                        src={"/hewan-img/1718522205_666e915d5065f.png"}
                        classes="rounded-top-5"
                      />
                      <div className="card-body">
                        <div className="card-text p-3">
                          <Heading color={"text-blue"} size={"fs-4"}>
                            Milo dan Miko
                          </Heading>
                          <Description size={"mb-0"}>
                            Jenis Kelamin : Jantan
                          </Description>
                          <Description size={"mb-0"}>
                            Usia : 3 Bulan
                          </Description>
                          <Description size={"text-muted mb-0 mt-2"}>
                            <FaLocationDot /> Bandung, Jawa Barat
                          </Description>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="d-inline-block"
                    style={{ width: "18rem", marginRight: "1rem" }}
                  >
                    <div
                      className="card border-0 rounded-5"
                      style={{ width: "18rem" }}
                    >
                      <Img
                        src={"/hewan-img/1718522205_666e915d5065f.png"}
                        classes="rounded-top-5"
                      />
                      <div className="card-body">
                        <div className="card-text p-3">
                          <Heading color={"text-blue"} size={"fs-4"}>
                            Milo dan Miko
                          </Heading>
                          <Description size={"mb-0"}>
                            Jenis Kelamin : Jantan
                          </Description>
                          <Description size={"mb-0"}>
                            Usia : 3 Bulan
                          </Description>
                          <Description size={"text-muted mb-0 mt-2"}>
                            <FaLocationDot /> Bandung, Jawa Barat
                          </Description>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="d-inline-block"
                    style={{ width: "18rem", marginRight: "1rem" }}
                  >
                    <div
                      className="card border-0 rounded-5"
                      style={{ width: "18rem" }}
                    >
                      <Img
                        src={"/hewan-img/1718522205_666e915d5065f.png"}
                        classes="rounded-top-5"
                      />
                      <div className="card-body">
                        <div className="card-text p-3">
                          <Heading color={"text-blue"} size={"fs-4"}>
                            Milo dan Miko
                          </Heading>
                          <Description size={"mb-0"}>
                            Jenis Kelamin : Jantan
                          </Description>
                          <Description size={"mb-0"}>
                            Usia : 3 Bulan
                          </Description>
                          <Description size={"text-muted mb-0 mt-2"}>
                            <FaLocationDot /> Bandung, Jawa Barat
                          </Description>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="d-inline-block"
                    style={{ width: "18rem", marginRight: "1rem" }}
                  >
                    <div
                      className="card border-0 rounded-5"
                      style={{ width: "18rem" }}
                    >
                      <Img
                        src={"/hewan-img/1718522205_666e915d5065f.png"}
                        classes="rounded-top-5"
                      />
                      <div className="card-body">
                        <div className="card-text p-3">
                          <Heading color={"text-blue"} size={"fs-4"}>
                            Milo dan Miko
                          </Heading>
                          <Description size={"mb-0"}>
                            Jenis Kelamin : Jantan
                          </Description>
                          <Description size={"mb-0"}>
                            Usia : 3 Bulan
                          </Description>
                          <Description size={"text-muted mb-0 mt-2"}>
                            <FaLocationDot /> Bandung, Jawa Barat
                          </Description>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

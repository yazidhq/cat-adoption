import IconedCard from "@/Components/IconedCard";
import IconedImg from "@/Components/IconedImg";
import { Link } from "@inertiajs/react";

export default function HeroCard() {
  return (
    <div className="container hero-card">
      <div className="row">
        <div className="col-lg">
          <Link
            href={route("adopsi", { kategori: "anjing" })}
            className="text-decoration-none"
          >
            <IconedCard>
              <IconedImg text={"Anjing"} img={"dog"} />
            </IconedCard>
          </Link>
        </div>
        <div className="col-lg">
          <Link
            href={route("adopsi", { kategori: "kucing" })}
            className="text-decoration-none"
          >
            <IconedCard>
              <IconedImg text={"Kucing"} img={"cat"} />
            </IconedCard>
          </Link>
        </div>
        <div className="col-lg">
          <Link href={route("daftar_donasi")} className="text-decoration-none">
            <IconedCard>
              <IconedImg text={"Donasi"} img={"donate"} />
            </IconedCard>
          </Link>
        </div>
        <div className="col-lg">
          <Link href={route("daftar_event")} className="text-decoration-none">
            <IconedCard>
              <IconedImg text={"Event"} img={"event"} />
            </IconedCard>
          </Link>
        </div>
        <div className="col-lg">
          <Link href={route("daftar_shelter")} className="text-decoration-none">
            <IconedCard>
              <IconedImg text={"Shelter"} img={"shelter"} />
            </IconedCard>
          </Link>
        </div>
      </div>
    </div>
  );
}

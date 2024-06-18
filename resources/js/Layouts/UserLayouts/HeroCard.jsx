import IconedCard from "@/Components/IconedCard";
import IconedImg from "@/Components/IconedImg";

export default function HeroCard() {
  return (
    <div className="container hero-card">
      <div className="row">
        <div className="col-lg">
          <IconedCard>
            <IconedImg text={"Anjing"} img={"dog"} />
          </IconedCard>
        </div>
        <div className="col-lg">
          <IconedCard>
            <IconedImg text={"Kucing"} img={"cat"} />
          </IconedCard>
        </div>
        <div className="col-lg">
          <IconedCard>
            <IconedImg text={"Donasi"} img={"donate"} />
          </IconedCard>
        </div>
        <div className="col-lg">
          <IconedCard>
            <IconedImg text={"Event"} img={"event"} />
          </IconedCard>
        </div>
        <div className="col-lg">
          <IconedCard>
            <IconedImg text={"Shelter"} img={"shelter"} />
          </IconedCard>
        </div>
      </div>
    </div>
  );
}

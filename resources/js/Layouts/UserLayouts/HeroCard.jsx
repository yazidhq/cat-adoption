import IconedCard from "@/Components/IconedCard";
import IconedImg from "@/Components/IconedImg";

export default function HeroCard() {
  return (
    <div className="container" style={{ marginTop: "-8%" }}>
      <div className="row row-cols-5">
        <IconedCard>
          <IconedImg text={"Anjing"} img={"dog"} />
        </IconedCard>
        <IconedCard>
          <IconedImg text={"Kucing"} img={"cat"} />
        </IconedCard>
        <IconedCard>
          <IconedImg text={"Donasi"} img={"donate"} />
        </IconedCard>
        <IconedCard>
          <IconedImg text={"Event"} img={"event"} />
        </IconedCard>
        <IconedCard>
          <IconedImg text={"Shelter"} img={"shelter"} />
        </IconedCard>
      </div>
    </div>
  );
}

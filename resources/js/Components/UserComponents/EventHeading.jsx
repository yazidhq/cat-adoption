import Heading from "../Heading";
import Img from "../Img";

export default function EventHeading({ text }) {
  return (
    <div className="d-flex align-items-center gap-4 mb-5 pt-4">
      <Img
        src="/core-img/icon/cat-hand.png"
        style={{ width: "35px", height: "35px" }}
      />
      <Heading size={"display-5"}>{text}</Heading>
    </div>
  );
}

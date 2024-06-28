import Heading from "../Heading";
import Img from "../Img";

export default function EventHeading({ text, is_orange }) {
  return (
    <div className="d-flex align-items-center gap-4 mb-5 pt-4">
      <Img
        src="/core-img/icon/cat-hand.png"
        style={{
          width: "35px",
          height: "35px",
          filter: is_orange
            ? ""
            : "invert(53%) sepia(87%) saturate(308%) hue-rotate(136deg) brightness(95%) contrast(89%)",
        }}
      />
      <Heading size={"display-5"}>{text}</Heading>
    </div>
  );
}

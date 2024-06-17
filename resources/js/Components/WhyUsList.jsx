import Description from "./Description";
import Heading from "./Heading";
import Img from "./Img";

export default function WhyUsList({ img, head, children }) {
  return (
    <div className="row pt-3">
      <div className="col-md-3">
        <Img src={img} width={"120px"} />
      </div>
      <div className="col-md-9">
        <Heading color={"text-dark-orange mb-"} size={"fs-4"}>
          {head}
        </Heading>
        <Description size={"fs-6"}>{children}</Description>
      </div>
    </div>
  );
}

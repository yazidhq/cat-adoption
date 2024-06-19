import Img from "./Img";

export default function IconedImg({ text, img }) {
  return (
    <div className="iconed-img">
      <div className="d-flex align-items-center justify-content-center pt-3">
        <span className="py-3">
          <Img src={`/core-img/icon/${img}.png`} />
        </span>
      </div>
      <p className="pb-2 fw-bold fs-4">{text}</p>
    </div>
  );
}

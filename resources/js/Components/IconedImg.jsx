import Img from "./Img";

export default function IconedImg({ text, img }) {
  return (
    <div>
      <div className="d-flex align-item-center justify-content-center pt-3">
        <span className="text-dark-orange py-3">
          <Img src={`/core-img/icon/${img}.png`} />
        </span>
      </div>
      <p className="text-blue pb-2 fw-bold fs-4 text-center">{text}</p>
    </div>
  );
}

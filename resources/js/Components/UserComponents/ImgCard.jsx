import Img from "../Img";

export default function ImgCard({ img, shelterId, is_detail, is_status }) {
  return (
    <div
      className="position-relative"
      style={{ width: "100%", paddingTop: `${is_status ? "60%" : "90%"}` }}
    >
      <Img
        src={`/hewan-img/${img}`}
        className={`img-fluid position-absolute top-0 start-0 w-100 h-100 object-fit-cover rounded-${
          is_detail ? (is_status ? "4 " : "4 shadow") : "top-5"
        }`}
      />
      {shelterId && (
        <Img
          src={`/core-img/is_user.png`}
          className="position-absolute py-3 px-3 mt-3 mx-3 rounded-4"
          style={{
            top: "10px",
            right: "10px",
            backgroundColor: "rgba(30, 30, 30, 0.7)",
          }}
        />
      )}
    </div>
  );
}

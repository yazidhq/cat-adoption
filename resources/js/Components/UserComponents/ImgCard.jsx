import Img from "../Img";

export default function ImgCard({
  img,
  shelterId,
  is_detail,
  is_status,
  is_berita,
  is_event,
  is_donasi,
  is_detail_donasi,
}) {
  return (
    <div
      className="position-relative"
      style={{
        width: "100%",
        paddingTop: `${
          is_status || is_event || is_donasi
            ? "60%"
            : is_detail || is_detail_donasi
            ? "110%"
            : "90%"
        }`,
      }}
    >
      <Img
        src={
          is_donasi || is_detail_donasi
            ? `/donasi-img/${img}`
            : is_event
            ? `/event-img/${img}`
            : is_berita
            ? `/berita-img/${img}`
            : `/hewan-img/${img}`
        }
        className={`img-fluid position-absolute top-0 start-0 w-100 h-100 object-fit-cover rounded-${
          is_detail_donasi
            ? "start-4 flex-fill"
            : is_detail
            ? is_status
              ? "4 "
              : "4 shadow"
            : is_berita || is_event || is_donasi
            ? "top-4"
            : "top-5"
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

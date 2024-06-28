import Heading from "@/Components/Heading";
import Img from "@/Components/Img";
import Pagination from "@/Components/Pagination";
import ImgCard from "@/Components/UserComponents/ImgCard";
import Profile from "@/Layouts/UserLayouts/Profile";
import { Link } from "@inertiajs/react";
import { CgCalendarDates } from "react-icons/cg";
import moment from "moment";
import BlueButton from "@/Components/UserComponents/BlueButton";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Events({ auth, events }) {
  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  return (
    <Profile auth={auth} title={"Events"}>
      <div className="px-4 pb-4">
        <Img src={"/core-img/event-bar.png"} />
      </div>
      <div className="px-4">
        {events.data.length === 0 ? (
          <div className="text-center">
            <h4 className="py-5">
              OOPS.. YOU HAVE NO{" "}
              <span className="fw-bold text-blue">EVENTS</span> YET!
            </h4>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-2 pb-4">
            {events.data.map((item) => (
              <div className="col" key={item.id}>
                <div className="card border rounded-4 shadow-sm">
                  <Link
                    href={route("detail_event", item.id)}
                    className="text-decoration-none"
                  >
                    <ImgCard img={item.poster} is_event={true} />
                  </Link>
                  <div className="card-body">
                    <div className="card-text">
                      <Heading size={"fs-4"}>
                        <Link
                          href={route("detail_event", item.id)}
                          className="text-decoration-none text-dark"
                        >
                          {capitalize(item.tema)}
                        </Link>
                      </Heading>
                      <div className="mt-2 text-secondary">
                        <CgCalendarDates />
                        <span className="mx-1" style={{ fontSize: "0.75rem" }}>
                          {moment(item.hari_tanggal).format("DD MMMM YYYY")}
                        </span>
                      </div>
                      <p
                        className="mt-2 text-secondary"
                        dangerouslySetInnerHTML={{
                          __html: truncateText(item.deskripsi, 15),
                        }}
                      ></p>
                      <Link
                        href={route("detail_event", item.id)}
                        className="text-decoration-none"
                      >
                        <div className="d-grid text-center mt-5">
                          <BlueButton>
                            Detail <span className="mx-1"></span>
                            <FaArrowRightLong className="mb-1" />
                          </BlueButton>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Pagination links={events.links} user={true} />
      </div>
    </Profile>
  );
}

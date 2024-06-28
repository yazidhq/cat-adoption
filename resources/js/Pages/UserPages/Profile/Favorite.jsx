import Description from "@/Components/Description";
import Heading from "@/Components/Heading";
import Img from "@/Components/Img";
import Pagination from "@/Components/Pagination";
import ImgCard from "@/Components/UserComponents/ImgCard";
import Profile from "@/Layouts/UserLayouts/Profile";
import { Link } from "@inertiajs/react";
import { FaHeart, FaLocationDot, FaRegHeart } from "react-icons/fa6";

export default function Favorite({ auth, hewan }) {
  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <Profile auth={auth} title={"Favorite"}>
      <div className="px-4 pb-4">
        <Img src={"/core-img/fav-bar.png"} />
      </div>
      <div className="px-4">
        {hewan.data.length === 0 ? (
          <div className="text-center">
            <h4 className="py-5">
              OOPS.. YOU HAVE NO{" "}
              <span className="fw-bold text-blue">FAVORITE</span> YET!
            </h4>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-2 pb-4">
            {hewan.data.map((item) => (
              <div className="col" key={item.id}>
                <div className="card border rounded-5 shadow-sm">
                  <Link
                    href={route("detail_adopsi", item.id)}
                    className="text-decoration-none"
                  >
                    <ImgCard img={item.foto} shelterId={item.shelter_id} />
                  </Link>
                  <div className="card-body">
                    <div className="card-text p-2">
                      <Heading color={"text-blue"} size={"fs-4 mb-1"}>
                        <div className="d-flex justify-content-between">
                          <Link
                            href={route("detail_adopsi", item.id)}
                            className="text-decoration-none text-blue"
                          >
                            {capitalize(item.nama)}
                          </Link>
                          {auth.user &&
                          item.favorite.some(
                            (fav) => fav.user_id === auth.user.id
                          ) ? (
                            <Link
                              href={route("hapus_favorite", item.id)}
                              method="post"
                              className="text-blue"
                            >
                              <FaHeart className="fs-3" />
                            </Link>
                          ) : (
                            <Link
                              href={route("tambah_favorite", item.id)}
                              method="post"
                              className="text-blue"
                            >
                              <FaRegHeart className="fs-3" />
                            </Link>
                          )}
                        </div>
                      </Heading>
                      <div className="mt-2" style={{ fontSize: "0.90rem" }}>
                        <Description size={"mb-0"}>
                          Jenis Kelamin : {capitalize(item.kelamin)}
                        </Description>
                        <Description size={"mb-0"}>
                          Usia : {item.usia} Bulan
                        </Description>
                      </div>
                      <div style={{ fontSize: "0.75rem" }}>
                        <Description size={"text-muted mb-0 mt-2"}>
                          <FaLocationDot /> {capitalize(item.kota)},{" "}
                          {capitalize(item.provinsi)}
                        </Description>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Pagination links={hewan.links} user={true} />
      </div>
    </Profile>
  );
}

import { IoSearch } from "react-icons/io5";

export default function Hero() {
  return (
    <div className="bg-orange pb-5">
      <div className="pb-5">
        <div className="container py-5">
          <div className="row flex-lg-row-reverse">
            <div className="row flex-lg-row-reverse">
              <div
                className="col-lg-4"
                data-aos="fade-left"
                data-aos-duration="1000"
              >
                <div className="lc-block">
                  <img
                    src="/core-img/cat.png"
                    alt="Logo"
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="col-lg-8">
                <div
                  className="lc-block mb-4 mt-5"
                  data-aos="fade"
                  data-aos-duration="2000"
                >
                  <div editable="rich">
                    <h1 className="rfs-30 fw-bold">
                      Lorem ipsum <br />
                      <span>
                        <strong className="text-navy">
                          Lorem ipsum dolor sit.
                        </strong>
                      </span>
                    </h1>
                  </div>
                </div>
                <div className="lc-block mb-4" data-aos="fade">
                  <div editable="rich">
                    <p className="fs-5">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Quibusdam beatae quaerat, consequatur nisi distinctio
                      soluta nobis ducimus aliquam, sed fugiat dolorem eius
                      sunt, excepturi eligendi!
                    </p>
                    <div className="row col-8">
                      <div className="input-group">
                        <input type="text" className="form-control border-0" />
                        <button className="btn btn-info px-3">
                          <IoSearch />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

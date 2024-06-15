import { IoSearch } from "react-icons/io5";

export default function Hero() {
  return (
    <div className="pb-5 bg-red-orange pt-5">
      <div className="pb-5 pt-5">
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
                    <h1 className="rfs-30 fw-bold text-white">
                      Lorem ipsum <br />
                      <span>
                        <strong className="text-white">
                          Lorem ipsum dolor sit.
                        </strong>
                      </span>
                    </h1>
                  </div>
                </div>
                <div className="lc-block mb-4" data-aos="fade">
                  <div editable="rich">
                    <p className="fs-5 text-white">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Quibusdam beatae quaerat, consequatur nisi distinctio
                      soluta nobis ducimus aliquam, sed fugiat dolorem eius
                      sunt, excepturi eligendi!
                    </p>
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

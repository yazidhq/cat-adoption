import { IoLogoOctocat } from "react-icons/io5";

export default function HeroCard() {
  return (
    <div className="container" style={{ marginTop: "-6%" }}>
      <div className="row row-cols-md-3">
        <div className="col">
          <div className="bg-light shadow border-0 rounded-5 p-1">
            <div className="d-flex align-item-center justify-content-center">
              <div className="text-red">
                <div className="d-flex align-item-center justify-content-center">
                  <span className="py-4">
                    <IoLogoOctocat className="display-1" />
                  </span>
                </div>
                <p className="pb-2 fw-bold">Lorem Ipsum Dolor</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="bg-light shadow border-0 rounded-5 p-1">
            <div className="d-flex align-item-center justify-content-center">
              <div className="text-red">
                <div className="d-flex align-item-center justify-content-center">
                  <span className="py-4">
                    <IoLogoOctocat className="display-1" />
                  </span>
                </div>
                <p className="pb-2 fw-bold">Lorem Ipsum Dolor</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="bg-light shadow border-0 rounded-5 p-1">
            <div className="d-flex align-item-center justify-content-center">
              <div className="text-red">
                <div className="d-flex align-item-center justify-content-center">
                  <span className="py-4">
                    <IoLogoOctocat className="display-1" />
                  </span>
                </div>
                <p className="pb-2 fw-bold">Lorem Ipsum Dolor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

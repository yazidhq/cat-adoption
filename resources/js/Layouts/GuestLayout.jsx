import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
  return (
    <div className="bg-orange ">
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ width: "100%", height: "100vh" }}
      >
        <div
          className="card rounded-5 border-0 shadow"
          style={
            route().current("login") ? { width: "30rem" } : { width: "50rem" }
          }
        >
          <div>
            <Link href="/">
              <div className="d-flex justify-content-center mt-5">
                <img
                  src="/core-img/logo.png"
                  alt="Logo"
                  className="img-fluid"
                  width={"100px"}
                />
              </div>
            </Link>
          </div>
          <div className="card-body px-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

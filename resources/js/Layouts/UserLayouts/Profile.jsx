import Heading from "@/Components/Heading";
import SectionPage from "@/Layouts/UserLayouts/SectionPage";
import { Link } from "@inertiajs/react";

export default function Profile({ auth, title, children }) {
  return (
    <SectionPage title={title} auth={auth}>
      <div className="bg-light pt-5">
        <div className="container py-5">
          <div className="bg-white my-4 rounded-4 p-5 shadow-sm">
            <Heading>Pengaturan Akun</Heading>
            <div className="row mt-5">
              <div className="d-flex flex-column gap-4 col-md-2">
                <Link
                  href={""}
                  className={`text-decoration-none ${
                    route().current("user_profile")
                      ? "text-blue fw-bold"
                      : "text-secondary"
                  }`}
                >
                  Profil Saya
                </Link>
                <Link
                  href={""}
                  className={`text-decoration-none ${
                    route().current("...") ? "text-blue" : "text-secondary"
                  }`}
                >
                  Status Adopsi
                </Link>
                <Link
                  href={""}
                  className={`text-decoration-none ${
                    route().current("...") ? "text-blue" : "text-secondary"
                  }`}
                >
                  Event Terdaftar
                </Link>
                <Link
                  href={""}
                  className={`text-decoration-none ${
                    route().current("...") ? "text-blue" : "text-secondary"
                  }`}
                >
                  Favorit
                </Link>
                <Link
                  href={""}
                  className="text-decoration-none text-danger mt-5"
                >
                  Hapus Akun
                </Link>
              </div>
              <div className="col-md-10 border-start border-3">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </SectionPage>
  );
}

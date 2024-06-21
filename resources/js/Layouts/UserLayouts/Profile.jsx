import Heading from "@/Components/Heading";
import Img from "@/Components/Img";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import BlueRdButton from "@/Components/UserComponents/BlueRdButton";
import BlueRdOutlineButton from "@/Components/UserComponents/BlueRdOutlineButton";
import LinkButton from "@/Components/UserComponents/LinkButton";
import SectionPage from "@/Layouts/UserLayouts/SectionPage";
import { Link, useForm } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function Profile({ auth, title, children }) {
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const passwordInput = useRef();

  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
  } = useForm({
    password: "",
  });

  const confirmingDeletion = () => {
    setConfirmingUserDeletion(true);
  };

  const deleteUser = (e) => {
    e.preventDefault();

    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);
    reset();
  };

  return (
    <SectionPage title={title} auth={auth}>
      <div className="bg-light pt-5">
        <div className="container py-5">
          <div className="bg-white my-4 rounded-4 p-5 shadow-sm">
            <Heading>Pengaturan Akun</Heading>
            <div className="row mt-5">
              <div className="d-flex flex-column gap-4 col-md-2">
                <Link
                  href={route("user_profile")}
                  className={`text-decoration-none ${
                    route().current("user_profile")
                      ? "text-blue fw-bold"
                      : "text-secondary"
                  }`}
                >
                  Profil Saya
                </Link>
                <Link
                  href={route("status_adopsi")}
                  className={`text-decoration-none ${
                    route().current("status_adopsi")
                      ? "text-blue fw-bold"
                      : "text-secondary"
                  }`}
                >
                  Status Adopsi
                </Link>
                <Link
                  href={""}
                  className={`text-decoration-none ${
                    route().current("...")
                      ? "text-blue fw-bold"
                      : "text-secondary"
                  }`}
                >
                  Event Terdaftar
                </Link>
                <Link
                  href={""}
                  className={`text-decoration-none ${
                    route().current("...")
                      ? "text-blue fw-bold"
                      : "text-secondary"
                  }`}
                >
                  Favorit
                </Link>
                <LinkButton
                  btnClick={confirmingDeletion}
                  className="fw-bold text-start text-danger px-0 text-decoration-none mt-5"
                >
                  Hapus Akun
                </LinkButton>
                {confirmingUserDeletion && (
                  <div
                    className="modal fade show"
                    style={{ display: "block" }}
                    tabIndex="-1"
                    role="dialog"
                  >
                    <div
                      className="modal-dialog shadow rounded-5"
                      role="document"
                    >
                      <div className="modal-content border-0 rounded-5">
                        <div className="modal-body p-5 text-center">
                          <Img src={"/core-img/sad-cat.png"} />
                          <Heading size={"fs-5 mt-4"}>
                            Apakah kamu yakin ingin menghapus akunmu? semua data
                            dan riwayat akan hilang secara permanen
                          </Heading>
                          <div className="mt-4">
                            <form onSubmit={deleteUser} className="p-6">
                              <div className="mb-4">
                                <TextInput
                                  id="password"
                                  type="password"
                                  name="password"
                                  ref={passwordInput}
                                  value={data.password}
                                  onChange={(e) =>
                                    setData("password", e.target.value)
                                  }
                                  className="form-control"
                                  isFocused
                                  placeholder="Password"
                                />
                                <InputError
                                  message={errors.password}
                                  className="mt-2 text-red"
                                />
                              </div>
                              <BlueRdButton
                                type={"submit"}
                                disabled={processing}
                              >
                                Hapus
                              </BlueRdButton>
                              <span className="mx-3"></span>
                              <BlueRdOutlineButton
                                type="button"
                                onClick={closeModal}
                              >
                                Tutup
                              </BlueRdOutlineButton>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-md-10 border-start border-3">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </SectionPage>
  );
}

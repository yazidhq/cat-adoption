import Description from "@/Components/Description";
import Heading from "@/Components/Heading";
import Img from "@/Components/Img";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import OrangeButton from "@/Components/UserComponents/OrangeButton";
import OrangeOutlineButton from "@/Components/UserComponents/OrangeOutlineButton";
import OrangeRdButton from "@/Components/UserComponents/OrangeRdButton";
import OrangeRdOutlineButton from "@/Components/UserComponents/OrangeRdOutlineButton";
import SectionPage from "@/Layouts/UserLayouts/SectionPage";
import { Link, router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import Swal from "sweetalert2";

export default function PendaftaranAdopsi({
  auth,
  hewan,
  successMessage,
  errorMessage,
}) {
  const { data, setData, post, errors } = useForm({
    usia: "",
    dokumen_foto: "",
    apakah_ada_peliharaan_lain: "",
    berapa_orang_yang_tinggal_bersama: "",
  });

  const [modalVisible, setModalVisible] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    post(route("proses_pendaftaran_adopsi", hewan.id));
  };

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  useEffect(() => {
    if (successMessage || errorMessage) {
      setModalVisible(true);
    }
  }, [successMessage, errorMessage]);

  const handleBack = () => {
    setModalVisible(false);
    router.get(route("detail_adopsi", hewan.id));
  };

  const handleCheckStatus = () => {
    setModalVisible(false);
    router.get(route("user_profile"));
  };

  return (
    <SectionPage title={"Pendaftaran Adopsi"} auth={auth}>
      <div className="bg-light pt-5">
        <div className="container py-5">
          <div className="row mt-4">
            <div className="col-md-6">
              <Heading color={"text-blue"}>
                {capitalize(hewan.nama)} ( {capitalize(hewan.kategori)}{" "}
                {capitalize(hewan.jenis_hewan)} )
              </Heading>
              <Description color={"text-blue"}>
                Lengkapi data di bawah ini untuk proses pengajuan adopsi.
                Apabila telah disetujui oleh pemilik hewan selanjutnya akan
                ditentukan jadwal kunjungan ataupun pengantaran hewan sesuai
                kebijakan masing-masing.
              </Description>
              <Description color={"text-dark-orange"}>
                Note: Akses{" "}
                <Link
                  href={route("user_profile")}
                  className="text-dark-orange fw-bold text-decoration-none"
                >
                  profile
                </Link>{" "}
                untuk merubah data diri Anda
              </Description>
              <form onSubmit={submit} className="mt-4">
                <div className="row">
                  <div className="col-md-6 mt-2">
                    <InputLabel className="form-label">Nama Depan</InputLabel>
                    <TextInput
                      value={auth.user.nama_depan || ""}
                      className="form-control"
                      disabled
                    />
                  </div>

                  <div className="col-md-6 mt-2">
                    <InputLabel className="form-label">
                      Nama Belakang
                    </InputLabel>
                    <TextInput
                      value={auth.user.nama_belakang || ""}
                      className="form-control"
                      disabled
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6 mt-2">
                    <InputLabel className="form-label">Email</InputLabel>
                    <TextInput
                      value={auth.user.email || ""}
                      className="form-control"
                      disabled
                    />
                  </div>

                  <div className="col-md-6 mt-2">
                    <InputLabel className="form-label">
                      Nomor Telepon
                    </InputLabel>
                    <TextInput
                      value={auth.user.nomor_wa || ""}
                      className="form-control"
                      disabled
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6 mt-2">
                    <InputLabel className="form-label">Usia</InputLabel>
                    <TextInput
                      type="number"
                      min="0"
                      id="usia"
                      name="usia"
                      value={data.usia}
                      className="form-control"
                      autoComplete="usia"
                      onChange={(e) => setData("usia", e.target.value)}
                      isFocused={true}
                    />

                    <InputError
                      message={errors.usia}
                      className="mt-2 text-red"
                    />
                  </div>

                  <div className="col-md-6 mt-2">
                    <InputLabel className="form-label">Alamat</InputLabel>
                    <TextInput
                      value={auth.user.email || ""}
                      className="form-control"
                      disabled
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <InputLabel className="form-label">
                    Dokumen foto atau video beberapa bagian Rumah Anda (PDF)
                  </InputLabel>
                  <input
                    type="file"
                    name="dokumen_foto"
                    accept=".pdf"
                    className="form-control"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file && file.type === "application/pdf") {
                        setData("dokumen_foto", file);
                      } else {
                        Swal.fire({
                          position: "center",
                          icon: "error",
                          title: "File yang Anda pilih bukan PDF",
                          showConfirmButton: false,
                          timer: 1500,
                        });
                        e.target.value = null;
                      }
                    }}
                  />
                  <InputError
                    message={errors.dokumen_foto}
                    className="mt-1 text-red"
                  />
                </div>

                <div className="mt-3">
                  <InputLabel className="form-label">
                    Apakah anda memilki hewan peliharaan lain? Sertakan jenis
                    hewan apa
                  </InputLabel>
                  <TextInput
                    type="text"
                    id="apakah_ada_peliharaan_lain"
                    name="apakah_ada_peliharaan_lain"
                    value={data.apakah_ada_peliharaan_lain}
                    className="form-control"
                    autoComplete="apakah_ada_peliharaan_lain"
                    onChange={(e) =>
                      setData("apakah_ada_peliharaan_lain", e.target.value)
                    }
                  />
                  <InputError
                    message={errors.apakah_ada_peliharaan_lain}
                    className="mt-2 text-red"
                  />
                </div>

                <div className="mt-3">
                  <InputLabel className="form-label">
                    Berapa orang yang tinggal di sini dan apakah ada yang
                    memiliki alergi?
                  </InputLabel>
                  <TextInput
                    type="text"
                    id="berapa_orang_yang_tinggal_bersama"
                    name="berapa_orang_yang_tinggal_bersama"
                    value={data.berapa_orang_yang_tinggal_bersama}
                    className="form-control"
                    autoComplete="berapa_orang_yang_tinggal_bersama"
                    onChange={(e) =>
                      setData(
                        "berapa_orang_yang_tinggal_bersama",
                        e.target.value
                      )
                    }
                  />
                  <InputError
                    message={errors.berapa_orang_yang_tinggal_bersama}
                    className="mt-2 text-red"
                  />
                </div>

                <div className="d-flex gap-3 mt-5">
                  <OrangeButton type={"submit"}>Kirim</OrangeButton>
                  <Link href={route("detail_adopsi", hewan.id)}>
                    <OrangeOutlineButton>Batal</OrangeOutlineButton>
                  </Link>
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <Img
                src={`/hewan-img/${hewan.foto}`}
                width={"100%"}
                classes="img-thumbnail"
              />
            </div>
          </div>
        </div>
      </div>

      {modalVisible && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content border-0 shadow rounded-5">
              <div className="modal-body p-5">
                <div className="d-flex justify-content-center mb-4">
                  <FaCircleCheck
                    className="text-blue"
                    style={{ fontSize: "7rem" }}
                  />
                </div>
                <Heading size={"fs-4 text-center mb-2 text-blue"}>
                  Berhasil Terkirim
                </Heading>
                <Heading size={"fs-6 text-center mb-5"}>
                  {successMessage || errorMessage}
                </Heading>
                <div className="d-grid d-flex flex-column gap-3">
                  <OrangeRdButton onClick={handleCheckStatus}>
                    Cek Status Adopsi
                  </OrangeRdButton>
                  <OrangeRdOutlineButton onClick={handleBack}>
                    Kembali
                  </OrangeRdOutlineButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </SectionPage>
  );
}

import Heading from "@/Components/Heading";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import BlueRdButton from "@/Components/UserComponents/BlueRdButton";
import CircleImg from "@/Components/UserComponents/CircleImg";
import Profile from "@/Layouts/UserLayouts/Profile";
import { router, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function UserProfile({ auth, successMessage, errorMessage }) {
  const { data, setData, post, errors } = useForm({
    nama_depan: auth.user.nama_depan || "",
    nama_belakang: auth.user.nama_belakang || "",
    alamat: auth.user.alamat || "",
    kode_pos: auth.user.kode_pos || "",
    nomor_wa: auth.user.nomor_wa || "",
    bio: auth.user.bio || "",
    email: auth.user.email || "",
    foto: auth.user.foto || "",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("update_profile", auth.user.id));
  };

  useEffect(() => {
    if (successMessage || errorMessage) {
      Swal.fire({
        position: "top-end",
        icon: successMessage ? "success" : "error",
        title: successMessage || errorMessage,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        router.reload({ preserveState: false });
      });
    }
  }, [successMessage, errorMessage]);

  return (
    <Profile auth={auth} title={"Profile"}>
      <div className="px-4">
        <Heading size={"fs-4"}>Profile Saya</Heading>
        <div className="d-flex gap-4 p-4 mt-4 border rounded-4">
          <CircleImg
            img={
              auth.user.foto
                ? `/user-img/${auth.user.foto}`
                : `/core-img/default-profile.jpg`
            }
            width={"100px"}
            is_navbar={true}
          />
          <div className="d-flex flex-column justify-content-center">
            <Heading size={"fs-4"}>
              {(
                auth.user.nama_depan +
                " " +
                auth.user.nama_belakang
              ).toUpperCase()}
            </Heading>
            <p>{auth.user.bio}</p>
          </div>
        </div>
        <form onSubmit={submit} encType="multipart/form-data">
          <div className="p-4 mt-4 border rounded-4">
            <Heading size={"fs-5"}>Informasi Pribadi</Heading>
            <div className="row row-cols-1 row-cols-md-2">
              <div className="col mt-3">
                <InputLabel className="form-label" htmlFor="nama_depan">
                  Nama Depan
                </InputLabel>

                <TextInput
                  type="text"
                  name="nama_depan"
                  id="nama_depan"
                  className="w-full form-control"
                  value={data.nama_depan}
                  onChange={(e) => setData("nama_depan", e.target.value)}
                />
                <InputError
                  message={errors.nama_depan}
                  className="mt-2 text-red"
                />
              </div>
              <div className="col mt-3">
                <InputLabel className="form-label" htmlFor="nama_belakang">
                  Nama Belakang
                </InputLabel>

                <TextInput
                  type="text"
                  name="nama_belakang"
                  id="nama_belakang"
                  className="w-full form-control"
                  value={data.nama_belakang}
                  onChange={(e) => setData("nama_belakang", e.target.value)}
                />
                <InputError
                  message={errors.nama_belakang}
                  className="mt-2 text-red"
                />
              </div>
              <div className="col mt-3">
                <InputLabel className="form-label" htmlFor="email">
                  Email
                </InputLabel>

                <TextInput
                  type="text"
                  name="email"
                  id="email"
                  className="w-full form-control"
                  value={data.email}
                  onChange={(e) => setData("email", e.target.value)}
                />
                <InputError message={errors.email} className="mt-2 text-red" />
              </div>
              <div className="col mt-3">
                <InputLabel className="form-label" htmlFor="nomor_wa">
                  Nomor Hp
                </InputLabel>

                <TextInput
                  type="number"
                  min="0"
                  name="nomor_wa"
                  id="nomor_wa"
                  className="w-full form-control"
                  value={data.nomor_wa}
                  onChange={(e) => setData("nomor_wa", e.target.value)}
                />
                <InputError
                  message={errors.nomor_wa}
                  className="mt-2 text-red"
                />
              </div>
              <div className="col mt-3">
                <InputLabel className="form-label" htmlFor="bio">
                  Bio
                </InputLabel>

                <TextInput
                  type="text"
                  name="bio"
                  id="bio"
                  className="w-full form-control"
                  value={data.bio}
                  onChange={(e) => setData("bio", e.target.value)}
                />
                <InputError message={errors.bio} className="mt-2 text-red" />
              </div>
              <div className="col mt-3">
                <InputLabel className="form-label" htmlFor="alamat">
                  Lokasi
                </InputLabel>

                <TextInput
                  type="text"
                  name="alamat"
                  id="alamat"
                  className="w-full form-control"
                  value={data.alamat}
                  onChange={(e) => setData("alamat", e.target.value)}
                />
                <InputError message={errors.alamat} className="mt-2 text-red" />
              </div>
              <div className="col mt-3">
                <InputLabel className="form-label" htmlFor="kode_pos">
                  Kode Pos
                </InputLabel>

                <TextInput
                  type="number"
                  min="0"
                  name="kode_pos"
                  id="kode_pos"
                  className="w-full form-control"
                  value={data.kode_pos}
                  onChange={(e) => setData("kode_pos", e.target.value)}
                />
                <InputError
                  message={errors.kode_pos}
                  className="mt-2 text-red"
                />
              </div>
              <div className="col mt-3">
                <InputLabel className="form-label">Foto</InputLabel>
                <TextInput
                  type="file"
                  name="foto"
                  id="foto"
                  className="w-full form-control"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && file.type.startsWith("image/")) {
                      setData("foto", file);
                    } else {
                      Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Yang anda pilih bukan gambar",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      e.target.value = null;
                    }
                  }}
                />
                <InputError message={errors.foto} className="mt-2 text-red" />
              </div>
            </div>
          </div>
          <div className="mt-5 text-center">
            <BlueRdButton type={"submit"}>Simpan</BlueRdButton>
          </div>
        </form>
      </div>
    </Profile>
  );
}

import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    nama_depan: "",
    nama_belakang: "",
    alamat: "",
    kode_pos: "",
    nomor_wa: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route("register"));
  };

  return (
    <GuestLayout>
      <Head title="Register" />

      <p className="text-center fw-bold fs-4 text-blue">DAFTAR</p>

      <form onSubmit={submit}>
        <div className="row">
          <div className="col-md-6">
            <TextInput
              id="nama_depan"
              name="nama_depan"
              value={data.nama_depan}
              className="mt-1 form-control"
              autoComplete="nama_depan"
              isFocused={true}
              onChange={(e) => setData("nama_depan", e.target.value)}
              placeholder="Nama Depan"
              required
            />

            <InputError message={errors.nama_depan} className="mt-2" />
          </div>

          <div className="col-md-6">
            <TextInput
              id="nama_belakang"
              name="nama_belakang"
              value={data.nama_belakang}
              className="mt-1 form-control"
              autoComplete="nama_belakang"
              onChange={(e) => setData("nama_belakang", e.target.value)}
              placeholder="Nama Belakang"
              required
            />

            <InputError message={errors.nama_belakang} className="mt-2" />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-6">
            <TextInput
              id="alamat"
              name="alamat"
              value={data.alamat}
              className="mt-1 form-control"
              autoComplete="alamat"
              onChange={(e) => setData("alamat", e.target.value)}
              placeholder="Lokasi"
              required
            />

            <InputError message={errors.alamat} className="mt-2" />
          </div>

          <div className="col-md-6">
            <TextInput
              type="number"
              min="0"
              id="kode_pos"
              name="kode_pos"
              value={data.kode_pos}
              className="mt-1 form-control"
              autoComplete="kode_pos"
              onChange={(e) => setData("kode_pos", e.target.value)}
              placeholder="Kode Pos"
              required
            />

            <InputError message={errors.kode_pos} className="mt-2" />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-6">
            <TextInput
              type="number"
              min="0"
              id="nomor_wa"
              name="nomor_wa"
              value={data.nomor_wa}
              className="mt-1 form-control"
              autoComplete="nomor_wa"
              onChange={(e) => setData("nomor_wa", e.target.value)}
              placeholder="Nomor Telepon"
              required
            />

            <InputError message={errors.nomor_wa} className="mt-2" />
          </div>

          <div className="col-md-6">
            <TextInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              className="mt-1 form-control"
              autoComplete="username"
              onChange={(e) => setData("email", e.target.value)}
              placeholder="Email"
              required
            />

            <InputError message={errors.email} className="mt-2" />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-6">
            <TextInput
              id="password"
              type="password"
              name="password"
              value={data.password}
              className="mt-1 form-control"
              autoComplete="new-password"
              onChange={(e) => setData("password", e.target.value)}
              placeholder="Password"
              required
            />

            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="col-md-6">
            <TextInput
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              value={data.password_confirmation}
              className="mt-1 form-control"
              autoComplete="new-password"
              onChange={(e) => setData("password_confirmation", e.target.value)}
              placeholder="Password Confirmation"
              required
            />

            <InputError
              message={errors.password_confirmation}
              className="mt-2"
            />
          </div>
        </div>

        <div className="text-center mt-5">
          <button className="btn btn-rd-orange" disabled={processing}>
            Register
          </button>
          <div className="mt-3">
            <Link
              href={route("login")}
              className="text-decoration-none text-dark mt-4 fs-6"
            >
              Sudah punya akun? <span className="text-blue fw-bold">Masuk</span>
            </Link>
          </div>
        </div>
      </form>
    </GuestLayout>
  );
}

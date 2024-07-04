import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(route("login"));
  };

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
      )}

      <p className="text-center fw-bold fs-4 text-blue">MASUK</p>

      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="email" value="Email" className="form-label" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 form-control"
            autoComplete="username"
            isFocused={true}
            onChange={(e) => setData("email", e.target.value)}
          />

          <InputError message={errors.email} className="mt-2 text-red" />
        </div>

        <div className="mt-4">
          <InputLabel
            htmlFor="password"
            value="Password"
            className="form-label"
          />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 form-control"
            autoComplete="current-password"
            onChange={(e) => setData("password", e.target.value)}
          />

          <InputError message={errors.password} className="mt-2 text-red" />
        </div>

        <div className="block mt-4">
          <label className="d-flex justify-content-between">
            <div>
              <Checkbox
                name="remember"
                checked={data.remember}
                onChange={(e) => setData("remember", e.target.checked)}
              />
              <span className="mx-2 form-label">Remember me</span>
            </div>
            {/* <div>
              {canResetPassword && (
                <Link
                  href={route("password.request")}
                  className="text-decoration-none text-dark mt-4 text-muted fs-6"
                >
                  Forgot your password?
                </Link>
              )}
            </div> */}
          </label>
        </div>

        <div className="text-center mt-5">
          <button className="btn btn-rd-orange" disabled={processing}>
            Login
          </button>
          <div className="mt-3">
            <Link
              href={route("register")}
              className="text-decoration-none text-dark mt-4 fs-6"
            >
              Belum punya akun?{" "}
              <span className="text-blue fw-bold">Daftar</span>
            </Link>
          </div>
        </div>
      </form>
    </GuestLayout>
  );
}

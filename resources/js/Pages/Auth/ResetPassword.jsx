import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
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

    post(route("password.store"));
  };

  return (
    <GuestLayout>
      <Head title="Reset Password" />

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
            onChange={(e) => setData("email", e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />
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
            autoComplete="new-password"
            isFocused={true}
            onChange={(e) => setData("password", e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel
            htmlFor="password_confirmation"
            value="Confirm Password"
            className="form-label"
          />

          <TextInput
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 form-control"
            autoComplete="new-password"
            onChange={(e) => setData("password_confirmation", e.target.value)}
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-rd-red" disabled={processing}>
            Reset Password
          </button>
        </div>
      </form>
    </GuestLayout>
  );
}

import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdateSosmed({ className = "", paw_sosmed = {} }) {
  const initialData = {
    fb: paw_sosmed ? paw_sosmed.fb || "" : "",
    ig: paw_sosmed ? paw_sosmed.ig || "" : "",
    yt: paw_sosmed ? paw_sosmed.yt || "" : "",
    wa: paw_sosmed ? paw_sosmed.wa || "" : "",
    line: paw_sosmed ? paw_sosmed.line || "" : "",
    email: paw_sosmed ? paw_sosmed.email || "" : "",
  };

  const { data, setData, post, errors, processing, recentlySuccessful } =
    useForm(initialData);

  const submit = (e) => {
    e.preventDefault();
    post(route("paw_sosmed"));
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">Social Media</h2>
        <p className="mt-1 text-sm text-gray-600">Update repaw social media</p>
      </header>

      <form
        onSubmit={submit}
        className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <InputLabel htmlFor="fb" value="Facebook" />
          <TextInput
            id="fb"
            className="mt-1 block w-full"
            value={data.fb}
            onChange={(e) => setData("fb", e.target.value)}
            autoComplete="fb"
          />
          <InputError className="mt-2" message={errors.fb} />
        </div>

        <div>
          <InputLabel htmlFor="ig" value="Instagram" />
          <TextInput
            id="ig"
            className="mt-1 block w-full"
            value={data.ig}
            onChange={(e) => setData("ig", e.target.value)}
            autoComplete="ig"
          />
          <InputError className="mt-2" message={errors.ig} />
        </div>

        <div>
          <InputLabel htmlFor="yt" value="YouTube" />
          <TextInput
            id="yt"
            className="mt-1 block w-full"
            value={data.yt}
            onChange={(e) => setData("yt", e.target.value)}
            autoComplete="yt"
          />
          <InputError className="mt-2" message={errors.yt} />
        </div>

        <div>
          <InputLabel htmlFor="wa" value="WhatsApp" />
          <TextInput
            id="wa"
            className="mt-1 block w-full"
            value={data.wa}
            onChange={(e) => setData("wa", e.target.value)}
            autoComplete="wa"
          />
          <InputError className="mt-2" message={errors.wa} />
        </div>

        <div>
          <InputLabel htmlFor="line" value="LINE" />
          <TextInput
            id="line"
            className="mt-1 block w-full"
            value={data.line}
            onChange={(e) => setData("line", e.target.value)}
            autoComplete="line"
          />
          <InputError className="mt-2" message={errors.line} />
        </div>

        <div>
          <InputLabel htmlFor="email" value="Email" />
          <TextInput
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            autoComplete="email"
          />
          <InputError className="mt-2" message={errors.email} />
        </div>

        <div className="md:col-span-2 flex items-center gap-4">
          <PrimaryButton disabled={processing}>Save</PrimaryButton>
          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}

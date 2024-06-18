import DashboardSection from "@/Components/DashboardSection";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import RedButton from "@/Components/RedButton";
import TextInput from "@/Components/TextInput";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Link, useForm } from "@inertiajs/react";
import { GoPlus } from "react-icons/go";
import { IoCaretBackOutline } from "react-icons/io5";

export default function AddDonasi({ auth }) {
  const { data, setData, post, errors } = useForm({
    tema_donasi: "",
    deskripsi: "",
    target_dana: "",
    batas_waktu: "",
    gambar: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("donasi.store"));
  };

  const handleDescriptionChange = (e, editor) => {
    const descriptionData = editor.getData();
    setData("deskripsi", descriptionData);
  };

  return (
    <DashboardSection
      auth={auth.user}
      heading={"Tambah Donasi"}
      title={"Tambah Donasi"}
    >
      <form onSubmit={submit} encType="multipart/form-data">
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <InputLabel htmlFor="tema_donasi">Tema Donasi</InputLabel>
            <div className="mt-2">
              <TextInput
                type="text"
                name="tema_donasi"
                id="tema_donasi"
                className="w-full"
                isFocused="true"
                value={data.tema_donasi}
                onChange={(e) => setData("tema_donasi", e.target.value)}
              />
              <InputError
                message={errors.tema_donasi}
                className="mt-2 text-red"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <InputLabel htmlFor="target_dana">Target Dana</InputLabel>
            <div className="mt-2">
              <TextInput
                type="number"
                name="target_dana"
                id="target_dana"
                className="w-full"
                value={data.target_dana}
                onChange={(e) => setData("target_dana", e.target.value)}
              />
              <InputError
                message={errors.target_dana}
                className="mt-2 text-red"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <InputLabel htmlFor="deskripsi">Deskripsi</InputLabel>
            <div className="mt-2">
              <CKEditor
                editor={ClassicEditor}
                data={data.deskripsi}
                onChange={handleDescriptionChange}
              />
              <InputError
                message={errors.deskripsi}
                className="mt-2 text-red"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <InputLabel htmlFor="batas_waktu">Batas Waktu</InputLabel>
            <div className="mt-2">
              <TextInput
                type="datetime-local"
                name="batas_waktu"
                id="batas_waktu"
                className="w-full"
                value={data.batas_waktu}
                onChange={(e) => setData("batas_waktu", e.target.value)}
              />
              <InputError
                message={errors.batas_waktu}
                className="mt-2 text-red"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <InputLabel>Cover Donasi</InputLabel>
            <div className="mt-2">
              <TextInput
                type="file"
                name="gambar"
                id="gambar"
                className="w-full rounded-0"
                onChange={(e) => setData("gambar", e.target.files[0])}
              />
              <InputError message={errors.gambar} className="mt-2 text-red" />
            </div>
          </div>
        </div>

        <div className="flex justify-content-between">
          <Link href={route("donasi.index")}>
            <RedButton className={"mt-20"}>
              <IoCaretBackOutline /> <span className="pr-2">Back</span>
            </RedButton>
          </Link>
          <RedButton className={"mt-20"} type={"submit"}>
            <GoPlus className="text-white" />
            <span className="pr-2">Submit</span>
          </RedButton>
        </div>
      </form>
    </DashboardSection>
  );
}

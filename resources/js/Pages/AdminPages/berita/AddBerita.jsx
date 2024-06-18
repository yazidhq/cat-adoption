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

export default function AddBerita({ auth }) {
  const { data, setData, post, errors } = useForm({
    judul: "",
    deskripsi: "",
    gambar: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("berita.store"));
  };

  const handleDescriptionChange = (e, editor) => {
    const descriptionData = editor.getData();
    setData("deskripsi", descriptionData);
  };

  return (
    <DashboardSection
      auth={auth.user}
      heading={"Tambah Berita"}
      title={"Tambah Berita"}
    >
      <form onSubmit={submit} encType="multipart/form-data">
        <div>
          <InputLabel htmlFor="judul">Judul Berita</InputLabel>
          <div className="mt-2">
            <TextInput
              type="text"
              name="judul"
              id="judul"
              className="w-full"
              isFocused="true"
              value={data.judul}
              onChange={(e) => setData("judul", e.target.value)}
            />
            <InputError message={errors.judul} className="mt-2 text-red" />
          </div>
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="deskripsi">Deskripsi</InputLabel>
          <div className="mt-2">
            <CKEditor
              editor={ClassicEditor}
              data={data.deskripsi}
              onChange={handleDescriptionChange}
            />
            <InputError message={errors.deskripsi} className="mt-2 text-red" />
          </div>
        </div>

        <div className="mt-4">
          <InputLabel>Cover</InputLabel>
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

        <div className="flex justify-content-between">
          <Link href={route("berita.index")}>
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

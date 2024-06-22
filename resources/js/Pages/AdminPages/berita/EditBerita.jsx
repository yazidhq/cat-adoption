import DashboardSection from "@/Components/DashboardSection";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import RedButton from "@/Components/RedButton";
import SelectOption from "@/Components/SelectOption";
import TextInput from "@/Components/TextInput";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Link, useForm } from "@inertiajs/react";
import { GoPlus } from "react-icons/go";
import { IoCaretBackOutline } from "react-icons/io5";
import Swal from "sweetalert2";

export default function AddBerita({ auth, berita }) {
  const { data, setData, post, errors } = useForm({
    judul: berita.judul || "",
    deskripsi: berita.deskripsi || "",
    kategori: berita.kategori || "",
    gambar: berita.gambar || "",
    _method: "PUT",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("berita.update", berita.id));
  };

  const handleDescriptionChange = (e, editor) => {
    const descriptionData = editor.getData();
    setData("deskripsi", descriptionData);
  };

  return (
    <DashboardSection
      auth={auth.user}
      heading={berita.judul}
      title={"Edit Berita"}
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
          <InputLabel htmlFor="kategori">Kategori</InputLabel>
          <div className="mt-2">
            <SelectOption
              nameId={"kategori"}
              value={data.kategori}
              onChange={(e) => setData("kategori", e.target.value)}
            >
              <option hidden value="">
                Pilih Opsi
              </option>
              <option value="Edukasi">Edukasi</option>
              <option value="Event">Event</option>
              <option value="Penyaluran Donasi">Penyaluran Donasi</option>
              <option value="Serba-Serbi">Serba-Serbi</option>
            </SelectOption>
            <InputError message={errors.kategori} className="mt-2 text-red" />
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
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && file.type.startsWith("image/")) {
                  setData("gambar", file);
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

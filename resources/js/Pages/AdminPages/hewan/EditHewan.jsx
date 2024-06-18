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

export default function AddHewan({ auth, hewan }) {
  const { data, setData, post, errors } = useForm({
    shelter_id: hewan.shelter_id ? hewan.shelter_id : null,
    user_id: hewan.user_id ? hewan.user_id : null,
    nama: hewan.nama || "",
    jenis_hewan: hewan.jenis_hewan || "",
    kelamin: hewan.kelamin || "",
    usia: hewan.usia || "",
    berat_badan: hewan.berat_badan || "",
    steril: hewan.steril || "",
    vaksin: hewan.vaksin || "",
    syarat_ketentuan: hewan.syarat_ketentuan || "",
    deskripsi: hewan.deskripsi || "",
    foto: hewan.foto || "",
    _method: "PUT",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("hewan.update", hewan.id));
  };

  const handleSyaratChange = (event, editor) => {
    const syaratData = editor.getData();
    setData("syarat_ketentuan", syaratData);
  };

  const handleDescriptionChange = (event, editor) => {
    const descriptionData = editor.getData();
    setData("deskripsi", descriptionData);
  };

  return (
    <DashboardSection
      auth={auth.user}
      heading={"Edit Hewan"}
      title={"Edit Hewan"}
    >
      <form onSubmit={submit} encType="multipart/form-data">
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <InputLabel htmlFor="nama">Nama</InputLabel>
            <div className="mt-2">
              <TextInput
                type="text"
                name="nama"
                id="nama"
                className="w-full"
                isFocused="true"
                value={data.nama}
                onChange={(e) => setData("nama", e.target.value)}
              />
              <InputError message={errors.nama} className="mt-2 text-red" />
            </div>
          </div>

          <div className="sm:col-span-2">
            <InputLabel htmlFor="jenis_hewan">Jenis Hewan</InputLabel>
            <div className="mt-2">
              <TextInput
                type="text"
                name="jenis_hewan"
                id="jenis_hewan"
                className="w-full"
                value={data.jenis_hewan}
                onChange={(e) => setData("jenis_hewan", e.target.value)}
              />
              <InputError
                message={errors.jenis_hewan}
                className="mt-2 text-red"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <InputLabel htmlFor="kelamin">Jenis Kelamin</InputLabel>
            <div className="mt-2">
              <SelectOption
                nameId={"kelamin"}
                value={data.kelamin}
                onChange={(e) => setData("kelamin", e.target.value)}
              >
                <option hidden value="">
                  Pilih Opsi
                </option>
                <option value="laki-laki">Laki-Laki</option>
                <option value="perempuan">Perempuan</option>
              </SelectOption>
              <InputError message={errors.kelamin} className="mt-2 text-red" />
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <InputLabel htmlFor="usia">Usia</InputLabel>
            <div className="mt-2">
              <TextInput
                type="text"
                name="usia"
                id="usia"
                className="w-full"
                value={data.usia}
                onChange={(e) => setData("usia", e.target.value)}
              />
              <InputError message={errors.usia} className="mt-2 text-red" />
            </div>
          </div>

          <div className="sm:col-span-2">
            <InputLabel htmlFor="berat_badan">Berat Badan</InputLabel>
            <div className="mt-2">
              <TextInput
                type="text"
                name="berat_badan"
                id="berat_badan"
                className="w-full"
                value={data.berat_badan}
                onChange={(e) => setData("berat_badan", e.target.value)}
              />
              <InputError
                message={errors.berat_badan}
                className="mt-2 text-red"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <InputLabel htmlFor="steril">Sudah Steril?</InputLabel>
            <div className="mt-2">
              <SelectOption
                nameId={"steril"}
                value={data.steril}
                onChange={(e) => setData("steril", e.target.value)}
              >
                <option hidden value="">
                  Pilih Opsi
                </option>
                <option value="1">Sudah</option>
                <option value="0">Belum</option>
              </SelectOption>
              <InputError message={errors.steril} className="mt-2 text-red" />
            </div>
          </div>

          <div className="sm:col-span-2">
            <InputLabel htmlFor="syarat_ketentuan">
              Syarat dan Ketentuan
            </InputLabel>
            <div className="mt-2">
              <CKEditor
                editor={ClassicEditor}
                data={data.syarat_ketentuan}
                onChange={handleSyaratChange}
              />
              <InputError
                message={errors.syarat_ketentuan}
                className="mt-2 text-red"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
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

          <div className="sm:col-span-2">
            <InputLabel htmlFor="vaksin">Sudah Vaksin?</InputLabel>
            <div className="mt-2">
              <SelectOption
                nameId={"vaksin"}
                value={data.vaksin}
                onChange={(e) => setData("vaksin", e.target.value)}
              >
                <option hidden value="">
                  Pilih Opsi
                </option>
                <option value="1">Sudah</option>
                <option value="0">Belum</option>
              </SelectOption>
              <InputError message={errors.vaksin} className="mt-2 text-red" />
            </div>
          </div>

          <div className="sm:col-span-2">
            <InputLabel htmlFor="foto">Foto</InputLabel>
            <div className="mt-2">
              <TextInput
                type="file"
                name="foto"
                id="foto"
                className="w-full rounded-0"
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

        <div className="flex justify-between mt-4">
          <Link
            href={
              hewan.shelter_id
                ? route("show_by_shelter_id", hewan.shelter_id)
                : route("show_by_user_id", hewan.user_id)
            }
          >
            <RedButton>
              <IoCaretBackOutline />
              <span className="pr-2">Back</span>
            </RedButton>
          </Link>
          <RedButton type="submit">
            <GoPlus className="text-white" />
            <span className="pr-2">Submit</span>
          </RedButton>
        </div>
      </form>
    </DashboardSection>
  );
}

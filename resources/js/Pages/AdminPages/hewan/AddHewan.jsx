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

export default function AddHewan({ auth, shelter, user }) {
  const { data, setData, post, errors } = useForm({
    shelter_id: shelter ? shelter.id : null,
    user_id: user ? user.id : null,
    nama: "",
    jenis_hewan: "",
    kelamin: "",
    usia: "",
    berat_badan: "",
    provinsi: shelter ? shelter.provinsi : "",
    kota: shelter ? shelter.kota : "",
    steril: "",
    vaksin: "",
    syarat_ketentuan: "",
    deskripsi: "",
    foto: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("hewan.store"));
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
      heading={`Tambah hewan di ${shelter ? shelter.nama : user.name}`}
      title={"Add Hewan"}
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
                <option value="jantan">Jantan</option>
                <option value="betina">Betina</option>
              </SelectOption>
              <InputError message={errors.kelamin} className="mt-2 text-red" />
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <InputLabel htmlFor="usia">Usia (ex: 3 Bulan)</InputLabel>
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
            <InputLabel htmlFor="berat_badan">Berat Badan (ex: 5kg)</InputLabel>
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
            <InputLabel htmlFor="provinsi">Provinsi Penempatan</InputLabel>
            <div className="mt-2">
              <TextInput
                type="text"
                name="provinsi"
                id="provinsi"
                className="w-full"
                value={data.provinsi}
                onChange={(e) => setData("provinsi", e.target.value)}
              />
              <InputError message={errors.provinsi} className="mt-2 text-red" />
            </div>
          </div>

          <div className="sm:col-span-2">
            <InputLabel htmlFor="kota">Kota</InputLabel>
            <div className="mt-2">
              <TextInput
                type="text"
                name="kota"
                id="kota"
                className="w-full"
                value={data.kota}
                onChange={(e) => setData("kota", e.target.value)}
              />
              <InputError message={errors.kota} className="mt-2 text-red" />
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
            <InputLabel htmlFor="foto">Foto</InputLabel>
            <div className="mt-2">
              <TextInput
                type="file"
                name="foto"
                id="foto"
                className="w-full rounded-0"
                onChange={(e) => setData("foto", e.target.files[0])}
              />
              <InputError message={errors.foto} className="mt-2 text-red" />
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <Link
            href={
              shelter
                ? route("show_by_shelter_id", shelter.id)
                : route("user.index", user.id)
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

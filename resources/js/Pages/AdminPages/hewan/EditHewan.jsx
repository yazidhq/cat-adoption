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

export default function EditHewan({ auth, hewan }) {
  const { data, setData, post, errors } = useForm({
    shelter_id: hewan.shelter_id ? hewan.shelter_id : null,
    user_id: hewan.user_id ? hewan.user_id : null,
    nama: hewan.nama || "",
    kategori: hewan.shelter_id ? hewan.shelter.khusus : hewan.kategori || "",
    jenis_hewan: hewan.jenis_hewan || "",
    kelamin: hewan.kelamin || "",
    usia: hewan.usia || "",
    berat_badan: hewan.berat_badan || "",
    biaya: hewan.biaya || "",
    provinsi: hewan.shelter_id ? hewan.shelter.provinsi : hewan.provinsi || "",
    kota: hewan.shelter_id ? hewan.shelter.kota : hewan.kota || "",
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
            <InputLabel htmlFor="kategori">Kategori</InputLabel>
            <div className="mt-2">
              <SelectOption
                nameId={"kategori"}
                value={data.kategori}
                onChange={(e) => setData("kategori", e.target.value)}
                disabled={hewan.shelter_id ? true : false}
              >
                {hewan.shelter_id ? (
                  <option value={data.kategori}>{data.kategori}</option>
                ) : (
                  <option hidden value="">
                    Pilih Opsi
                  </option>
                )}
                <option value="kucing">Kucing</option>
                <option value="anjing">Anjing</option>
              </SelectOption>
              <InputError message={errors.kategori} className="mt-2 text-red" />
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

          <div className="sm:col-span-2">
            <InputLabel htmlFor="usia">Usia (bulan)</InputLabel>
            <div className="mt-2">
              <TextInput
                type="number"
                min="1"
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
            <InputLabel htmlFor="berat_badan">Berat Badan (gram)</InputLabel>
            <div className="mt-2">
              <TextInput
                type="number"
                min="1"
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
            <InputLabel htmlFor="provinsi">Provinsi Penempatan</InputLabel>
            <div className="mt-2">
              <TextInput
                type="text"
                name="provinsi"
                id="provinsi"
                className="w-full"
                value={data.provinsi}
                onChange={(e) => setData("provinsi", e.target.value)}
                disabled={hewan.shelter_id ? true : false}
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
                disabled={hewan.shelter_id ? true : false}
              />
              <InputError message={errors.kota} className="mt-2 text-red" />
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
            <InputLabel htmlFor="biaya">Biaya Adopsi</InputLabel>
            <div className="mt-2">
              <TextInput
                type="number"
                min="1"
                name="biaya"
                id="biaya"
                className="w-full"
                value={data.biaya}
                onChange={(e) => setData("biaya", e.target.value)}
                disabled={hewan.user_id ? true : false}
              />
              <InputError message={errors.biaya} className="mt-2 text-red" />
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

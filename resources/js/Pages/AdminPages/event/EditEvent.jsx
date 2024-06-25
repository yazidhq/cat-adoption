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

export default function EditEvent({ auth, event }) {
  const { data, setData, post, errors } = useForm({
    tema: event.tema || "",
    kategori: event.kategori || "",
    keterangan: event.keterangan || "",
    hari_tanggal: event.hari_tanggal || "",
    waktu_mulai: event.waktu_mulai || "",
    waktu_selesai: event.waktu_selesai || "",
    lokasi: event.lokasi || "",
    deskripsi: event.deskripsi || "",
    syarat_partisipasi: event.syarat_partisipasi || "",
    benefit: event.benefit || "",
    poster: event.poster || "",
    _method: "PUT",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("event.update", event.id));
  };

  const handleDescriptionChange = (field) => (event, editor) => {
    const descriptionData = editor.getData();
    setData((prevData) => ({
      ...prevData,
      [field]: descriptionData,
    }));
  };

  return (
    <DashboardSection
      auth={auth.user}
      heading={"Tambah Event"}
      title={"Tambah Event"}
    >
      <form onSubmit={submit} encType="multipart/form-data">
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <InputLabel htmlFor="tema">Tema Event</InputLabel>
            <div className="mt-2">
              <TextInput
                type="text"
                name="tema"
                id="tema"
                className="w-full"
                isFocused="true"
                value={data.tema}
                onChange={(e) => setData("tema", e.target.value)}
              />
              <InputError message={errors.tema} className="mt-2 text-red" />
            </div>
          </div>

          <div className="sm:col-span-2">
            <InputLabel htmlFor="kategori">Kategori</InputLabel>
            <div className="mt-2">
              <SelectOption
                nameId={"kategori"}
                value={data.kategori}
                onChange={(e) => setData("kategori", e.target.value)}
              >
                <option hidden value="">
                  Pilih Kategori
                </option>
                <option value="info">Info</option>
                <option value="event">Event</option>
              </SelectOption>
              <InputError message={errors.kategori} className="mt-2 text-red" />
            </div>
          </div>

          {data.kategori === "info" && (
            <div className="sm:col-span-2">
              <InputLabel htmlFor="keterangan">Keterangan</InputLabel>
              <div className="mt-2">
                <SelectOption
                  nameId={"keterangan"}
                  value={data.keterangan}
                  onChange={(e) => setData("keterangan", e.target.value)}
                  required
                >
                  <option hidden value="">
                    Pilih Keterangan
                  </option>
                  <option value="pengetahuan">Pengetahuan</option>
                  <option value="adopsi">Adopsi</option>
                  <option value="kesehatan">Kesehatan</option>
                </SelectOption>
                <InputError
                  message={errors.keterangan}
                  className="mt-2 text-red"
                />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6 mt-4">
          <div className="sm:col-span-2">
            <InputLabel htmlFor="hari_tanggal">Hari Tanggal</InputLabel>
            <div className="mt-2">
              <TextInput
                type="date"
                name="hari_tanggal"
                id="hari_tanggal"
                className="w-full"
                value={data.hari_tanggal}
                onChange={(e) => setData("hari_tanggal", e.target.value)}
              />
              <InputError
                message={errors.hari_tanggal}
                className="mt-2 text-red"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <InputLabel htmlFor="waktu_mulai">Waktu Mulai</InputLabel>
            <div className="mt-2">
              <TextInput
                type="time"
                name="waktu_mulai"
                id="waktu_mulai"
                className="w-full"
                value={data.waktu_mulai}
                onChange={(e) => setData("waktu_mulai", e.target.value)}
              />
              <InputError
                message={errors.waktu_mulai}
                className="mt-2 text-red"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <InputLabel htmlFor="waktu_selesai">Waktu Selesai</InputLabel>
            <div className="mt-2">
              <TextInput
                type="time"
                name="waktu_selesai"
                id="waktu_selesai"
                className="w-full"
                value={data.waktu_selesai}
                onChange={(e) => setData("waktu_selesai", e.target.value)}
              />
              <InputError
                message={errors.waktu_selesai}
                className="mt-2 text-red"
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <InputLabel htmlFor="lokasi">Lokasi</InputLabel>
            <div className="mt-2">
              <TextInput
                type="text"
                name="lokasi"
                id="lokasi"
                className="w-full"
                value={data.lokasi}
                onChange={(e) => setData("lokasi", e.target.value)}
              />
              <InputError message={errors.lokasi} className="mt-2 text-red" />
            </div>
          </div>

          <div className="sm:col-span-2">
            <InputLabel htmlFor="deskripsi">Deskripsi</InputLabel>
            <div className="mt-2">
              <CKEditor
                editor={ClassicEditor}
                data={data.deskripsi}
                onChange={handleDescriptionChange("deskripsi")}
              />
              <InputError
                message={errors.deskripsi}
                className="mt-2 text-red"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <InputLabel htmlFor="syarat_partisipasi">
              Syarat Partisipasi
            </InputLabel>
            <div className="mt-2">
              <CKEditor
                editor={ClassicEditor}
                data={data.syarat_partisipasi}
                onChange={handleDescriptionChange("syarat_partisipasi")}
              />
              <InputError
                message={errors.syarat_partisipasi}
                className="mt-2 text-red"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <InputLabel htmlFor="benefit">Benefit Event</InputLabel>
            <div className="mt-2">
              <CKEditor
                editor={ClassicEditor}
                data={data.benefit}
                onChange={handleDescriptionChange("benefit")}
              />
              <InputError message={errors.benefit} className="mt-2 text-red" />
            </div>
          </div>

          <div className="sm:col-span-2">
            <InputLabel>Foto</InputLabel>
            <div className="mt-2">
              <TextInput
                type="file"
                name="poster"
                id="poster"
                className="w-full rounded-0"
                onChange={(e) => setData("poster", e.target.files[0])}
              />
              <InputError message={errors.poster} className="mt-2 text-red" />
            </div>
          </div>
        </div>

        <div className="flex justify-content-between">
          <Link href={route("event.index")}>
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

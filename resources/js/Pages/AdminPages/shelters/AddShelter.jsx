import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import RedButton from "@/Components/RedButton";
import SelectOption from "@/Components/SelectOption";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Head, Link, useForm } from "@inertiajs/react";
import { GoPlus } from "react-icons/go";
import { IoCaretBackOutline } from "react-icons/io5";

export default function AddShelter({ auth }) {
  const { data, setData, post, errors } = useForm({
    nama: "",
    provinsi: "",
    kota: "",
    alamat: "",
    nomor_wa: "",
    khusus: "",
    deskripsi: "",
    foto: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("shelter.store"));
  };

  const handleDescriptionChange = (e, editor) => {
    const descriptionData = editor.getData();
    setData("deskripsi", descriptionData);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Add new shelter
        </h2>
      }
    >
      <Head title="Add Shelter" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                      <form onSubmit={submit} encType="multipart/form-data">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                          <div className="sm:col-span-2">
                            <InputLabel htmlFor="nama">Nama Shelter</InputLabel>
                            <div className="mt-2">
                              <TextInput
                                type="text"
                                name="nama"
                                id="nama"
                                className="w-full"
                                isFocused="true"
                                value={data.nama}
                                onChange={(e) =>
                                  setData("nama", e.target.value)
                                }
                              />
                              <InputError
                                message={errors.nama}
                                className="mt-2 text-red"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <InputLabel htmlFor="provinsi">Provinsi</InputLabel>
                            <div className="mt-2">
                              <TextInput
                                type="text"
                                name="provinsi"
                                id="provinsi"
                                className="w-full"
                                value={data.provinsi}
                                onChange={(e) =>
                                  setData("provinsi", e.target.value)
                                }
                              />
                              <InputError
                                message={errors.provinsi}
                                className="mt-2 text-red"
                              />
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
                                onChange={(e) =>
                                  setData("kota", e.target.value)
                                }
                              />
                              <InputError
                                message={errors.kota}
                                className="mt-2 text-red"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                          <div className="sm:col-span-2">
                            <InputLabel htmlFor="alamat">Alamat</InputLabel>
                            <div className="mt-2">
                              <TextInput
                                type="text"
                                name="alamat"
                                id="alamat"
                                className="w-full"
                                value={data.alamat}
                                onChange={(e) =>
                                  setData("alamat", e.target.value)
                                }
                              />
                              <InputError
                                message={errors.alamat}
                                className="mt-2 text-red"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <InputLabel htmlFor="nomor_wa">
                              Nomor WhatsApp
                            </InputLabel>
                            <div className="mt-2">
                              <TextInput
                                type="number"
                                name="nomor_wa"
                                id="nomor_wa"
                                className="w-full"
                                value={data.nomor_wa}
                                onChange={(e) =>
                                  setData("nomor_wa", e.target.value)
                                }
                              />
                              <InputError
                                message={errors.nomor_wa}
                                className="mt-2 text-red"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <InputLabel htmlFor="khusus">Khusus</InputLabel>
                            <div className="mt-2">
                              <SelectOption
                                nameId={"khusus"}
                                value={data.khusus}
                                onChange={(e) =>
                                  setData("khusus", e.target.value)
                                }
                              >
                                <option hidden value="">
                                  Pilih Opsi
                                </option>
                                <option value="kucing">Kucing</option>
                                <option value="anjing">Anjing</option>
                              </SelectOption>
                              <InputError
                                message={errors.khusus}
                                className="mt-2 text-red"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <InputLabel htmlFor="deskripsi">
                              Deskripsi
                            </InputLabel>
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
                            <InputLabel>Foto</InputLabel>
                            <div className="mt-2">
                              <TextInput
                                type="file"
                                name="foto"
                                id="foto"
                                className="w-full rounded-0"
                                onChange={(e) =>
                                  setData("foto", e.target.files[0])
                                }
                              />
                              <InputError
                                message={errors.foto}
                                className="mt-2 text-red"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-content-between">
                          <Link href={route("shelter.index")}>
                            <RedButton className={"mt-20"}>
                              <IoCaretBackOutline />
                            </RedButton>
                          </Link>
                          <RedButton className={"mt-20"} type={"submit"}>
                            <GoPlus className="text-white" />
                            <span className="pr-2">Submit</span>
                          </RedButton>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

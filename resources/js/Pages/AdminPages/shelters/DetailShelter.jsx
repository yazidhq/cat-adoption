import RedButton from "@/Components/RedButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { IoCaretBackOutline } from "react-icons/io5";

export default function DetailShelter({ auth, shelter }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Shelters
        </h2>
      }
    >
      <Head title="Shelters" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                      <section className="text-gray-700 body-font overflow-hidden bg-white">
                        <div className="container">
                          <div className="flex flex-wrap">
                            <img
                              src={`/shelter-img/${shelter.foto}`}
                              alt=""
                              className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                            />
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                KHUSUS
                                {shelter.khusus.toUpperCase()}
                              </h2>
                              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                {shelter.nama}
                              </h1>
                              <p
                                className="leading-relaxed border-1 p-3 mt-3"
                                dangerouslySetInnerHTML={{
                                  __html: shelter.deskripsi,
                                }}
                              ></p>
                              <h1 className="text-gray-900 mt-4 title-font font-medium mb-1">
                                Provinsi/ Kota :{" "}
                                <strong>
                                  {shelter.provinsi}/ {shelter.kota}
                                </strong>
                              </h1>
                              <h1 className="text-gray-900 mt-2 title-font font-medium mb-1">
                                Alamat : <strong>{shelter.alamat}</strong>
                              </h1>
                              <h1 className="text-gray-900 mt-2 title-font font-medium mb-1">
                                WhatsApp : <strong>{shelter.nomor_wa}</strong>
                              </h1>
                              <div className="flex">
                                <Link href={route("shelter.index")}>
                                  <RedButton className={"mt-20"}>
                                    <IoCaretBackOutline />
                                  </RedButton>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
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

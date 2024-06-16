import RedButton from "@/Components/RedButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect } from "react";
import { GoPlus } from "react-icons/go";
import { IoCaretBackOutline } from "react-icons/io5";
import Swal from "sweetalert2";

export default function Hewan({
  auth,
  shelter,
  hewans,
  successMessage,
  errorMessage,
}) {
  useEffect(() => {
    if (successMessage || errorMessage) {
      Swal.fire({
        position: "top-end",
        icon: successMessage ? "success" : "error",
        title: successMessage || errorMessage,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        router.reload({ preserveState: false });
      });
    }
  }, [successMessage, errorMessage]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          {shelter.nama}
        </h2>
      }
    >
      <Head title="Hewan Shelter" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                      <div className="flex gap-3">
                        <Link href={route("shelter.index")}>
                          <RedButton className={"mb-4"}>
                            <IoCaretBackOutline />{" "}
                            <span className="pr-2">Back</span>
                          </RedButton>
                        </Link>
                        <Link href={route("add_by_shelter_id", shelter.id)}>
                          <RedButton>
                            <GoPlus className="text-white" />
                            <span className="pr-2">Tambah Hewan</span>
                          </RedButton>
                        </Link>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {hewans.map((item) => (
                          <div
                            className="max-w-sm rounded overflow-hidden border"
                            key={item.id}
                          >
                            <img
                              className="w-full"
                              src={`/hewan-img/${item.foto}`}
                              alt=""
                            />
                            <div className="px-6 py-4">
                              <div className="font-bold text-xl mb-2">
                                {item.nama} |{" "}
                                <span className="text-red">
                                  {item.is_adopsi ? "Diadopsi" : "Tersedia"}
                                </span>
                              </div>
                              <p className="text-gray-700 text-base">
                                Jenis Kelamin : {item.kelamin}
                              </p>
                              <p className="text-gray-700 text-base">
                                Usia : {item.usia}
                              </p>
                            </div>
                            <div className="px-6 pb-3 flex justify-content-end gap-3">
                              <Link href={route("hewan.edit", item.id)}>
                                Edit
                              </Link>
                              <Link
                                href={route("hewan.destroy", item.id)}
                                method="delete"
                                as="button"
                              >
                                Delete
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
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

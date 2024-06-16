import Pagination from "@/Components/Pagination";
import RedButton from "@/Components/RedButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import Swal from "sweetalert2";

export default function Shelters({
  auth,
  shelters,
  filters,
  successMessage,
  errorMessage,
}) {
  const [searchTerm, setSearchTerm] = useState(filters.search || "");

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

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    router.get(
      route(route().current()),
      { search: query },
      {
        preserveState: true,
        replace: true,
      }
    );
  };

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

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
                      <div className="d-flex justify-content-between">
                        <Link href={route("shelter.create")}>
                          <RedButton>
                            <GoPlus className="text-white" />
                            <span className="pr-2">New shelter</span>
                          </RedButton>
                        </Link>
                        <TextInput
                          type="text"
                          value={searchTerm}
                          onChange={handleSearch}
                          className="mb-2 pr-20"
                          placeholder="Find the shelter"
                        />
                      </div>
                      <hr />
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                            >
                              Nama
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                            >
                              Povinsi - Kota
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                            >
                              WhatsApp
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                            >
                              Khusus
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {shelters.data.map((item) => (
                            <tr key={item.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                <Link
                                  href={route("shelter.show", item.id)}
                                  className="text-primary"
                                >
                                  {capitalize(item.nama)}
                                </Link>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                {capitalize(item.provinsi)} -{" "}
                                {capitalize(item.kota)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                {item.nomor_wa}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 flex">
                                <Link
                                  href={route("show_by_shelter_id", item.id)}
                                >
                                  {capitalize(item.khusus)} -{" "}
                                  <span className="text-primary">
                                    {!item.hewan.is_adopsi && item.hewan.length}{" "}
                                    Tersedia
                                  </span>
                                </Link>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex text-primary">
                                  <Link
                                    href={route("shelter.edit", item.id)}
                                    className="mr-2"
                                  >
                                    Edit
                                  </Link>
                                  <Link
                                    href={route("shelter.destroy", item.id)}
                                    method="delete"
                                    as="button"
                                  >
                                    Hapus
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <Pagination links={shelters.links} />
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

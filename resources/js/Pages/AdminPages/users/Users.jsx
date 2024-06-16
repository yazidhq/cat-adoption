import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Users({
  auth,
  users,
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
          Users
        </h2>
      }
    >
      <Head title="Users" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                      <div className="d-flex justify-content-end">
                        <TextInput
                          type="text"
                          value={searchTerm}
                          onChange={handleSearch}
                          className="mb-2 pr-20"
                          placeholder="Find the users"
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
                              Nama - Email
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                            >
                              Alamat
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
                              Role - Actions
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                            >
                              Adopsi
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {users.data.map((item) => (
                            <tr key={item.id}>
                              {item.role == "user" && (
                                <>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    {capitalize(item.name)} - {item.email}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    {item.lokaso || item.kode_pos ? (
                                      <>
                                        {item.lokasi} - {item.kode_pos}
                                      </>
                                    ) : (
                                      <p>belum dibuat</p>
                                    )}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    {item.nomor_wa ? (
                                      <>{item.nomor_wa}</>
                                    ) : (
                                      <p>belum dibuat</p>
                                    )}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    <Link
                                      href={route(
                                        "make_user_to_admin_or_reverse",
                                        item.id
                                      )}
                                      method="post"
                                    >
                                      {capitalize(item.role)} -{" "}
                                      <span className="text-primary">
                                        {item.role == "user"
                                          ? "Jadikan Admin"
                                          : "Jadikan User"}
                                      </span>
                                    </Link>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    {item.hewan.length > 0 ? (
                                      <Link
                                        href={route("show_by_user_id", item.id)}
                                        className="text-primary"
                                      >
                                        {!item.hewan.is_adopsi &&
                                          item.hewan.length}{" "}
                                        Tersedia
                                      </Link>
                                    ) : (
                                      <Link
                                        href={route("add_by_user_id", item.id)}
                                        className="text-primary"
                                      >
                                        Buka adopsi
                                      </Link>
                                    )}
                                  </td>
                                </>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <Pagination links={users.links} />
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

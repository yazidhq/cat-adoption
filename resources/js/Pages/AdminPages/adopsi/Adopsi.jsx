import DashboardSection from "@/Components/DashboardSection";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import { Link, router } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Adopsi({
  auth,
  adopsi,
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
    <DashboardSection
      auth={auth.user}
      heading={"Status Adopsi"}
      title={"Status Adopsi"}
    >
      <div className="d-flex justify-content-between">
        <div className="flex-grow-1">
          <TextInput
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="mb-2 w-100"
            placeholder="Find by status (proses - terima - selesai).."
          />
        </div>
      </div>

      <hr />
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
            >
              User
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
            >
              Nama Kucing/Anjing
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
            >
              Tanggal Adopsi
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
            >
              Status
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
          {adopsi.data.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                <Link
                  href={route("adopsi_status.show", item.id)}
                  className="text-primary"
                >
                  {item.user ? capitalize(item.user.nama_depan) : "N/A"}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {item.hewan ? capitalize(item.hewan.nama) : "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {moment(item.created_at).format("DD MMMM YYYY")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {capitalize(item.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex gap-2 text-primary">
                  {item.status == "proses" ? (
                    <Link
                      href={route("terima_adopsi", item.id)}
                      method="post"
                      as="button"
                    >
                      Terima
                    </Link>
                  ) : (
                    <>
                      {item.status !== "selesai" && (
                        <Link
                          href={route("selesai_adopsi", item.id)}
                          method="post"
                          as="button"
                        >
                          Selesai
                        </Link>
                      )}
                    </>
                  )}
                  <Link
                    href={route("hapus_adopsi", item.id)}
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
      <Pagination links={adopsi.links} />
    </DashboardSection>
  );
}

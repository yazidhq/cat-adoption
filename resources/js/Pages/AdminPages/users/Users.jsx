import DashboardSection from "@/Components/DashboardSection";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import { Link, router } from "@inertiajs/react";
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
    <DashboardSection auth={auth.user} heading={"Users"} title={"Users"}>
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
              Adopsi
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
            >
              Role - Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.data.map((item) => (
            <tr key={item.id}>
              {item.role == "user" && (
                <>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {capitalize(item.nama_depan)} - {item.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {item.lokaso || item.kode_pos ? (
                      <>
                        {item.alamat} - {item.kode_pos}
                      </>
                    ) : (
                      <p>belum dibuat</p>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {item.nomor_wa ? <>{item.nomor_wa}</> : <p>belum dibuat</p>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {item.hewan.length > 0 ? (
                      <Link
                        href={route("show_by_user_id", item.id)}
                        className="text-primary"
                      >
                        {!item.hewan.is_adopsi && item.hewan.length} Tersedia
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    <Link
                      href={route("make_user_to_admin_or_reverse", item.id)}
                      method="post"
                    >
                      {capitalize(item.role)} -{" "}
                      <span className="text-primary">
                        {item.role == "user" ? "Jadikan Admin" : "Jadikan User"}
                      </span>
                    </Link>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination links={users.links} />
    </DashboardSection>
  );
}

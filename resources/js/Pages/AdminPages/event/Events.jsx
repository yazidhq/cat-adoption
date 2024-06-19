import DashboardSection from "@/Components/DashboardSection";
import Pagination from "@/Components/Pagination";
import RedButton from "@/Components/RedButton";
import TextInput from "@/Components/TextInput";
import { Link, router } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import Swal from "sweetalert2";

export default function Events({
  auth,
  events,
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
    <DashboardSection auth={auth.user} heading={"Events"} title={"Events"}>
      <div className="d-flex justify-content-between">
        <Link href={route("event.create")}>
          <RedButton>
            <GoPlus className="text-white" />
            <span className="pr-2">Tambah Event</span>
          </RedButton>
        </Link>
        <TextInput
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          className="mb-2 pr-20"
          placeholder="Find the events name"
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
              Tema Event
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
            >
              Hari Tanggal
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
            >
              Waktu Mulai - Selesai
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
          {events.data.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                <Link
                  href={route("event.show", item.id)}
                  className="text-primary"
                >
                  {capitalize(item.tema)}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {moment(item.hari_tanggal).format("DD/MM/YYYY")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {item.waktu_mulai} - {item.waktu_selesai}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex text-primary">
                  <Link href={route("event.edit", item.id)} className="mr-2">
                    Edit
                  </Link>
                  <Link
                    href={route("event.destroy", item.id)}
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
      <Pagination links={events.links} />
    </DashboardSection>
  );
}

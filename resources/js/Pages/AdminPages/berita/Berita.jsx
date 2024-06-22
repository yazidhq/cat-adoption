import DashboardSection from "@/Components/DashboardSection";
import Pagination from "@/Components/Pagination";
import RedButton from "@/Components/RedButton";
import TextInput from "@/Components/TextInput";
import { Link, router } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import Swal from "sweetalert2";

export default function Berita({
  auth,
  berita,
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
    <DashboardSection auth={auth.user} heading={"Berita"} title={"Berita"}>
      <div className="d-flex justify-content-between">
        <Link href={route("berita.create")}>
          <RedButton>
            <GoPlus className="text-white" />
            <span className="pr-2">Tambah Berita</span>
          </RedButton>
        </Link>
        <TextInput
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          className="mb-2 pr-20"
          placeholder="Find the news"
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
              Judul
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
            >
              Kategori
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
            >
              Tanggal Dibuat
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
          {berita.data.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                <Link
                  href={route("berita.show", item.id)}
                  className="text-primary"
                >
                  {capitalize(item.judul)}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {item.kategori}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {moment(item.created_at).format("DD/MM/YY HH:mm")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex text-primary">
                  <Link href={route("berita.edit", item.id)} className="mr-2">
                    Edit
                  </Link>
                  <Link
                    href={route("berita.destroy", item.id)}
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
      <Pagination links={berita.links} />
    </DashboardSection>
  );
}

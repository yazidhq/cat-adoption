import DashboardSection from "@/Components/DashboardSection";
import Pagination from "@/Components/Pagination";
import RedButton from "@/Components/RedButton";
import TextInput from "@/Components/TextInput";
import { Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoCaretBackOutline } from "react-icons/io5";
import Swal from "sweetalert2";

export default function Hewan({
  auth,
  shelter,
  user,
  hewans,
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

    console.log(searchTerm);

    router.get(
      route(shelter ? "show_by_shelter_id" : "show_by_user_id", {
        id: shelter ? shelter.id : user.id,
      }),
      { search: query },
      {
        preserveState: true,
        replace: true,
      }
    );
  };

  return (
    <DashboardSection
      auth={auth.user}
      heading={shelter ? shelter.nama : user.name}
      title={"Hewan Shelter"}
    >
      <div className="flex justify-content-between gap-3">
        <div className="flex gap-3">
          <Link href={shelter ? route("shelter.index") : route("user.index")}>
            <RedButton className={"mb-4"}>
              <IoCaretBackOutline /> <span className="pr-2">Back</span>
            </RedButton>
          </Link>
          <Link
            href={
              shelter
                ? route("add_by_shelter_id", shelter.id)
                : route("add_by_user_id", user.id)
            }
          >
            <RedButton>
              <GoPlus className="text-white" />
              <span className="pr-2">Tambah Hewan</span>
            </RedButton>
          </Link>
        </div>
        <div>
          <TextInput
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="mb-2 pr-20"
            placeholder="Find something"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {hewans.data.map((item) => (
          <div
            className="max-w-sm rounded overflow-hidden border"
            key={item.id}
          >
            <img className="w-full" src={`/hewan-img/${item.foto}`} alt="" />
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
              <p className="text-gray-700 text-base">Usia : {item.usia}</p>
            </div>
            <div className="px-6 pb-3 flex justify-content-end gap-3">
              <Link href={route("hewan.edit", item.id)}>Edit</Link>
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
      <Pagination links={hewans.links} />
    </DashboardSection>
  );
}

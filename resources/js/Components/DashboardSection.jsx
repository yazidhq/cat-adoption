import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function DashboardSection({ auth, heading, title, children }) {
  return (
    <AuthenticatedLayout
      user={auth}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          {heading}
        </h2>
      }
    >
      <Head title={title} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">{children}</div>
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

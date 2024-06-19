import Navbar from "@/Layouts/UserLayouts/Navbar";
import { Head } from "@inertiajs/react";
import Footer from "@/Layouts/UserLayouts/Footer";

export default function SectionPage({ title, auth, children }) {
  return (
    <>
      <Head title={title} />
      <Navbar auth={auth} />
      {children}
      <Footer />
    </>
  );
}

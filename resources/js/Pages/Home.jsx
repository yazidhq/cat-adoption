import Navbar from "@/Layouts/UserLayouts/Navbar";
import Hero from "@/Layouts/UserLayouts/Hero";
import HeroCard from "@/Layouts/UserLayouts/HeroCard";
import { Head } from "@inertiajs/react";

export default function Home({ auth }) {
  return (
    <>
      <Head title="Home" />
      <Navbar auth={auth} />
      <Hero />
      <HeroCard />
    </>
  );
}

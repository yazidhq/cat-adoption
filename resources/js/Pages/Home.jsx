import Navbar from "@/Layouts/UserLayouts/Navbar";
import Hero from "@/Layouts/UserLayouts/Hero";
import HeroCard from "@/Layouts/UserLayouts/HeroCard";

export default function Home({ auth }) {
  return (
    <>
      <Navbar auth={auth} />
      <Hero />
      <HeroCard />
    </>
  );
}

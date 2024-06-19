import Navbar from "@/Layouts/UserLayouts/Navbar";
import Hero from "@/Layouts/UserLayouts/Hero";
import HeroCard from "@/Layouts/UserLayouts/HeroCard";
import { Head } from "@inertiajs/react";
import WhyUs from "@/Layouts/UserLayouts/WhyUs";
import Footer from "@/Layouts/UserLayouts/Footer";
import Adoption from "@/Layouts/UserLayouts/Adoption";
import Story from "@/Layouts/UserLayouts/Story";
import SectionPage from "@/Layouts/UserLayouts/SectionPage";

export default function Home({ auth }) {
  return (
    <SectionPage title={"Home"} auth={auth}>
      <Hero />
      <HeroCard />
      <WhyUs />
      <Adoption />
      <Story />
    </SectionPage>
  );
}

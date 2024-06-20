import Hero from "@/Layouts/UserLayouts/Hero";
import HeroCard from "@/Layouts/UserLayouts/HeroCard";
import WhyUs from "@/Layouts/UserLayouts/WhyUs";
import Adoption from "@/Layouts/UserLayouts/Adoption";
import Story from "@/Layouts/UserLayouts/Story";
import SectionPage from "@/Layouts/UserLayouts/SectionPage";

export default function Home({ auth, hewan }) {
  return (
    <SectionPage title={"Home"} auth={auth}>
      <Hero />
      <HeroCard />
      <WhyUs />
      <Adoption hewan={hewan} />
      <Story />
    </SectionPage>
  );
}

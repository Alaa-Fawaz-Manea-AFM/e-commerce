import {
  HeroCarousel,
  Hero_comp_1,
  Hero_comp_2,
  Hero_comp_3,
  Hero_comp_4,
  Hero_comp_5,
} from "@/components";

const HomePage = async () => (
  <div className="min-h-screen flex flex-col gap-20">
    <HeroCarousel />
    <Hero_comp_1 />
    <Hero_comp_2 />
    <Hero_comp_3 />
    <Hero_comp_4 />
    <Hero_comp_5 />
  </div>
);

export default HomePage;

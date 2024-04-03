import { homePageEL3 } from "@/constant/Constant";
import Image from "next/image";
import Link from "next/link";

const Hero_comp_3 = () => (
  <div className="w-screen h-screen max-w-screen-xl space-y-10 mb-20">
    <h2 className="dark:text-white sm:text-5xl max-sm:text-2xl text-center mt-10">
      {homePageEL3.title}
    </h2>
    <Link
      href={`/products/?search&category=${homePageEL3.cat}`}
      className="w-full h-full relative block"
    >
      <Image
        fill
        src={homePageEL3.img_1}
        alt={homePageEL3.title}
        className="max-ss:hidden"
      />
      <Image
        fill
        src={homePageEL3.img_2}
        alt={homePageEL3.title}
        className="ss:hidden"
      />
    </Link>
  </div>
);

export default Hero_comp_3;

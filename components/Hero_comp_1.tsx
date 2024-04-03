import { homePageEL1 } from "@/constant/Constant";
import Image from "next/image";
import Link from "next/link";

const Hero_comp_1 = () => (
  <div className="w-[90%] mx-auto h-[200px] max-sm:h-[420px] sm:h-[650px]">
    <h2 className="dark:text-white sm:text-5xl max-sm:text-2xl text-center my-10">
      {homePageEL1.title}
    </h2>
    <div className="h-[200px] max-sm:h-[420px] sm:h-[650px] w-full flex gap-10 flex-col flex-wrap overflow-x-auto">
      {homePageEL1.images.map((img) => (
        <div
          key={img.titleImg}
          className="sm:translate-y-12 h-[90%] w-3/5 ss:w-2/5 md:w-1/3 space-y-5"
        >
          <Link
            href={`/products/?search&category=${img.cat}`}
            className="block relative w-full h-[90%] rounded-md"
          >
            <Image
              fill
              src={img.img}
              alt={img.titleImg}
              className="object-file cursor-pointer"
            />
          </Link>
          <div className="flex flex-col ">
            <Link
              href={`/products/?category=${img.cat}`}
              className="dark:text-white max-sm:text-base text-xl hover:text-red-500 cursor-pointer w-fit block"
            >
              {img.titleImg}
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Hero_comp_1;

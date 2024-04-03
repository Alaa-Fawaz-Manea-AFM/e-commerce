"use client";
import { homePageEL2 } from "@/constant/Constant";
import ProductSlider from "./ProductSlider";
import { useState } from "react";

const Hero_comp_2 = () => {
  const [category, setCategory] = useState("Men's Kurta");

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
  };

  return (
    <div className="w-full flex justify-center gap-3 flex-col ">
      <h2 className="sm:text-5xl max-sm:text-2xl text-center my-10">
        {homePageEL2.title}
      </h2>
      <div className="flex justify-center">
        {homePageEL2.Cate.map((cat) => (
          <button
            type="button"
            onClick={() => handleCategoryChange(cat.cat)}
            key={cat.title}
            className={`${
              category === cat.cat ? "border-b-green border-b-2" : ""
            } px-3 py-1`}
          >
            {cat.title}
          </button>
        ))}
      </div>
      <ProductSlider slice title={category} />
    </div>
  );
};

export default Hero_comp_2;

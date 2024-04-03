"use client";
import { useUserContext } from "@/context/MyState";
import { useEffect, useState } from "react";
import ProductDiv from "./ProductDiv";
import Link from "next/link";
import { IProduct } from "@/types";

const ProductSlider = ({ title, slice }: { title: string; slice: boolean }) => {
  const { product }: any = useUserContext();
  const [prod, setProd] = useState<IProduct[]>([]);

  useEffect(() => {
    let filter = product?.filter((item: IProduct) => item.category === title);

    setProd(slice ? filter.slice(0, 10) : filter);
  }, [product, title, slice]);

  return (
    <div className="sm:w-11/12 max-sm:w-screen max-sm:px-5 mx-auto my-5">
      {title ? (
        <div className="w-fit items-start group mb-10">
          <h1 className="font-semibold text-3xl">{title}</h1>
          <div className="bg-green w-1/2 h-1 group-hover:w-full duration-200 ease-out" />
        </div>
      ) : (
        ""
      )}
      <div className="space-y-10">
        <div className="flex flex-wrap w-full gap-5">
          {prod?.map((prod) => (
            <ProductDiv key={prod.id} prod={prod} />
          ))}
        </div>
        {prod.length > 0 ? (
          <Link
            href={`/products/?search&category=${title}`}
            className="px-5 py-2 bg-green hover:opacity-70 rounded-md block w-fit h-fit mx-auto"
          >
            More...
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProductSlider;

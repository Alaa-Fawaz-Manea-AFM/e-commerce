import { IoIosStar } from "react-icons/io";
import BtnAddToCart from "./BtnAddToCart";
import { IProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";

const ProductDiv = ({ prod }: { prod: IProduct }) => (
  <div className="w-[90vw] max-w-[90vw] ss:w-[300px] h-[400px] border-green hover:shadow-green overflow-hidden grid grid-cols-1 gap-2 p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out border rounded-lg px-5">
    <Link
      href={`/products/${prod.id}`}
      className="w-full relative h-[168px] col-span-1"
    >
      <Image
        fill
        src={prod?.images?.[0]}
        alt="image product"
        className="object-cover rounded-md hover:scale-105 transition-all"
      />
    </Link>
    <div className="flex flex-col justify-between gap-2 col-span-1">
      <div className="flex flex-col">
        <h1 className="font-black text-md line-clamp-1">{prod.title}</h1>
        <p className="line-clamp-3 text-sm dark:text-gray_dr_text text-gray_tx">
          {prod.description}
        </p>
        <div className="flex items-center justify-between sm:py-2">
          <b>
            <sup>$</sup>
            {prod.price}
          </b>
          <div className="flex items-center gap-1">
            <b>{prod.rating}</b>
            <IoIosStar size={25} className="text-yellow" />
          </div>
        </div>
      </div>
      <BtnAddToCart prodId={prod} />
    </div>
  </div>
);

export default ProductDiv;

"use client";
import { BtnAddToCart, ProductSlider } from "@/components";
import { useUserContext } from "@/context/MyState";
import { MdKeyboardArrowUp } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { IProduct } from "@/types";
import Image from "next/image";

const Comp_product_info = ({ productId }: { productId: string }) => {
  const { product }: any = useUserContext();

  const [productTemp, setProductTemp] = useState<IProduct>();
  const [toggleInfProd, setToggleInfProd] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [imgAlt, setImgAlt] = useState<number>(0);

  useEffect(() => {
    const tempProduct = product.find((prod: IProduct) => prod.id === productId);
    if (tempProduct) {
      setProductTemp(tempProduct);
      setImages(tempProduct?.images || []);
    }
  }, [product, productId]);

  const handleImgMove = (i: number, src: string) => {
    setImgSrc(src);
    setImgAlt(i);
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="w-full sm:px-10 py-10 mt-10 grid items-start gap-5 grid-cols-5">
        <div className="col-span-5 sm:col-span-2 flex-col-reverse flex items-center gap-5 w-fit mx-auto">
          <div className="flex flex-row gap-5 mx-auto">
            {images?.map((img, i) => (
              <div key={img}>
                <Image
                  width={56}
                  height={56}
                  src={img}
                  alt={`imageUrl_${i}`}
                  className={`${
                    imgAlt == i ? "border-[2px] border-green" : ""
                  } object-contain rounded-lg w-14 max-h-14 h-14 cursor-pointer`}
                  onClick={() => handleImgMove(i, img)}
                />
              </div>
            ))}
          </div>
          <div className="mx-auto max-w-[90%]">
            <Image
              width={1000}
              height={450}
              alt={`imageUrl_${imgAlt}`}
              className="w-full h-[450px] rounded-md"
              src={imgSrc || images[0]}
            />
          </div>
        </div>
        <div className="space-y-5 w-4/5 mx-auto sm:col-span-3 col-span-5 flex-col flex gap-5">
          <h2 className="text-sm title-font tracking-widest">BRAND NAME</h2>
          <h1 className="text-3xl leading-norma font-medium mb-1">
            {productTemp?.title}
          </h1>
          <div className="flex mb-4 items-center gap-3">
            <span className="flex items-center gap-2">
              <IoIosStar size={25} className="text-yellow" />

              <span className="text-lg font-semibold">
                {productTemp?.rating}
              </span>
            </span>
          </div>
          <span className="flex flex-col gap-3 border-b-2 mb-5 pb-5">
            <h1 className="text-xl font-semibold">PRODUCT DETAILS: </h1>
            <p>
              {productTemp?.description?.length! >= 300 ? (
                <>
                  {toggleInfProd ? (
                    <span className="w-fit">
                      {productTemp!.description?.slice(0, 300)}...
                      <button
                        onClick={() => setToggleInfProd(!toggleInfProd)}
                        className="flex gap-3 text-green hover:text-red"
                      >
                        <IoIosArrowDown size={25} />
                        See more
                      </button>
                    </span>
                  ) : (
                    <span className="w-fit">
                      {productTemp?.description}
                      <button
                        onClick={() => setToggleInfProd(!toggleInfProd)}
                        className="flex items-center gap-3 hover:text-green text-red w-fit"
                      >
                        <MdKeyboardArrowUp size={25} />
                        See less
                      </button>
                    </span>
                  )}
                </>
              ) : (
                productTemp?.description
              )}
            </p>
          </span>

          <div className="flex flex-wrap justify-between items-center xs:gap-0 gap-5">
            <span className="title-font font-medium text-2xl">
              ${productTemp?.price}
            </span>
            <div className="flex items-center max-xs:w-full">
              <BtnAddToCart prodId={productTemp!} />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-10">
        <ProductSlider slice title={productTemp?.category!} />
      </div>
    </div>
  );
};

export default Comp_product_info;

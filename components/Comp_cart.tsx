"use client";
import { handleDelItemCart, handleTotalProducts } from "@/constant/api";
import { useUserContext } from "@/context/MyState";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { IProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";

const Comp_cart = () => {
  const { userId, userInf }: any = useUserContext();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalDisc, setTotalDisc] = useState<number>(0);

  useEffect(() => {
    handleTotalProducts(userInf?.cart, setTotalAmount, setTotalDisc);
  }, [userInf, userId]);

  const handleDelItemCartFun = async (id: string) => {
    await handleDelItemCart(userInf, userId, id);
  };

  return (
    <div className="min-h-screen pt-32 pb-10">
      {userInf?.cart?.length == 0 || !userInf?.cart ? (
        <p className="text-center py-10 font-semibold text-3xl">
          There are no products
          <Link href="/products" className="block w-fit mx-auto mt-6 text-red">
            Do you want to add products?
          </Link>
        </p>
      ) : (
        <h1 className="mb-10 text-center text-2xl font-bold">
          Cart Items <b className="text-green">{userInf?.cart?.length}</b>
        </h1>
      )}
      <div className="flex gap-5 justify-center flex-col sm:flex-row mx-auto px-6 xl:px-0 w-fit">
        <section className="rounded-lg mt-6 flex flex-col gap-5">
          {userInf.cart?.map((car: IProduct) => {
            const { title, price, rating, images, description, id } = car;

            return (
              <div
                key={id}
                className="border-green hover:shadow-green grid grid-cols-3 gap-2 border-opacity-60 overflow-hidden drop-shadow-lg relative hover:shadow-lg transition-shadow duration-300 ease-in-out
                border rounded-lg p-2 w-full max-w-[700px]"
              >
                <Link
                  href={`/products/${id}`}
                  className="relative w-full h-[200px] max-h-[200px] col-span-1 max-ss:col-span-3"
                >
                  <Image
                    fill
                    src={images?.[0]}
                    alt="image product"
                    className="object-cover hover:scale-105 transition-all rounded-md"
                  />
                </Link>
                <section className="col-span-2 space-y-2 max-ss:col-span-3  max-ss:p-2 pt-2">
                  <h1 className="font-black text-xl pr-5 line-clamp-1">
                    {title}
                  </h1>
                  <p className="text-black text-sm line-clamp-4">
                    {description}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <b>
                      <sup>$</sup>
                      {price}
                    </b>
                    <span className="flex gap-2 items-center">
                      <span>{rating}</span>
                      <IoIosStar size={25} className="text-yellow" />
                    </span>
                  </div>
                </section>
                <button
                  name="btn Delet cart"
                  type="button"
                  onClick={() => handleDelItemCartFun(id!)}
                  className="dark:text-green right-0 fixed"
                >
                  <MdDeleteForever name="btn Delet cart" size={35} />
                </button>
              </div>
            );
          })}
        </section>
        {userInf.cart?.length > 0 ? (
          <div className="border-green mt-6 h-fit sm:w-[380px] mx-auto max-w-[500px] w-full rounded-lg border p-6 shadow-md">
            <section className="mb-2 flex justify-between">
              <p>Subtotal</p>
              <b className="dark:text-green">
                <sup>$</sup>
                {totalAmount}
              </b>
            </section>
            <section className="flex justify-between">
              <p>discount</p>
              <b className="dark:text-green">
                <sup>$</sup>
                {totalDisc > 0 ? "-" + totalDisc : "0"}
              </b>
            </section>

            <hr className="my-4 bg-gray" />
            <section className="flex justify-between mb-3">
              <p className="text-lg font-bold">Order total</p>
              <b className="dark:text-red mb-1 text-lg font-bold">
                <sup>$</sup>
                {totalAmount - totalDisc}
              </b>
            </section>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Comp_cart;

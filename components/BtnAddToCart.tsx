"use client";
import { useUserContext } from "@/context/MyState";
import { handleAddToCart } from "@/constant/api";
import { toast } from "react-toastify";
import { IProduct } from "@/types";

const BtnAddToCart = ({ prodId }: { prodId: IProduct }) => {
  const { userId, userInf }: any = useUserContext();

  const handleAddToCartFun = async () => {
    let productCart = userInf?.cart?.some(
      (item: IProduct) => item.id == prodId.id
    );
    if (!productCart) {
      await handleAddToCart(userId, prodId);
    }
  };

  return (
    <button
      onClick={() => {
        userId ? handleAddToCartFun() : toast.error("Sorry, your must login");
      }}
      className="border-green text-green hover:shadow-green hover:shadow-[inset_0_0_8px_rgb(250,245,255)] transition-all duration-300 ease-in-out text-centers font-medium border-b-4 rounded-lg text-xl  px-5 py-1.5 text-center mb-2 w-full"
    >
      Add To Cart
    </button>
  );
};

export default BtnAddToCart;

"use client";
import { useUserContext } from "@/context/MyState";
import { useRouter } from "next-nprogress-bar";
import { FaCartPlus } from "react-icons/fa";

const Btn_Cart = () => {
  const { userInf, userId }: any = useUserContext();
  const router = useRouter();

  const handleCartClick = () => {
    if (userId) return router.push("/cart");
    return router.push("/log-in");
  };

  return (
    <span
      className="flex items-center relative cursor-pointer"
      onClick={handleCartClick}
    >
      <FaCartPlus size={30} />
      {userInf?.cart?.length > 0 ? (
        <span className="absolute z-10 -right-1 -top-4 rounded-full font-semibold">
          {userInf.cart.length}
        </span>
      ):''}
    </span>
  );
};

export default Btn_Cart;

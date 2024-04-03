"use client";
import { useUserContext } from "@/context/MyState";
import { FaPowerOff } from "react-icons/fa";
import { validEmail } from "@/constant/api";
import { Avatar } from "@/public/assets";
import Image from "next/image";
import Link from "next/link";

const NavLink = () => {
  const { userInf, setUserId }: any = useUserContext();

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    setUserId("");
  };

  return (
    <>
      <Link href="/products" className="font-medium hover:underline">
        Products
      </Link>
      {userInf?.user?.name && userInf?.user?.name !== undefined ? (
        <div className="flex gap-2 items-start flex-col sm:flex-row sm:items-center">
          {userInf?.user?.email === validEmail ? (
            <Link href="/admin" className="font-medium hover:underline">
              Admin
            </Link>
          ) : (
            ""
          )}
          <span
            onClick={handleSignOut}
            className="font-medium hover:underline cursor-pointer"
          >
            <FaPowerOff size={25} color="red" />
          </span>
          <div className="flex items-center gap-1">
            Hi,
            {userInf?.user?.name?.length > 7
              ? `${userInf?.user?.name.slice(0, 10)}...`
              : userInf?.user?.name}
            <div className="w-7 h-7 object-contain flex items-center font-semibold justify-center bg-green rounded-full">
              {userInf?.user?.name?.slice(0, 1).toUpperCase()}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 items-start flex-col sm:flex-row sm:items-center">
          <Link href="/log-in" className="font-medium hover:underline">
            LogIn
          </Link>
          <Link href="/sign-up" className="font-medium hover:underline">
            SignUp
          </Link>
          <div className="flex items-center gap-2">
            Hi, Guest
            <Image
              width={32}
              height={32}
              src={Avatar}
              alt="avatar"
              className="object-cover"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NavLink;

"use client";
import { IoMenuSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import NavLink from "./NavLink";

const Toggle_Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <section className="flex text-lg sm:hidden relative cursor-pointer">
      <span onClick={handleToggle}>
        {toggle ? <IoMdClose size={30} /> : <IoMenuSharp size={30} />}
      </span>
      <div
        onClick={handleToggle}
        className={`${
          !toggle ? "hidden" : ""
        } sidebar absolute top-10 -left-5 mx-4 my-2 w-[200px] z-10 rounded-xl dark:bg-secondary bg-white p-5`}
      >
        <NavLink />
      </div>
    </section>
  );
};

export default Toggle_Navbar;

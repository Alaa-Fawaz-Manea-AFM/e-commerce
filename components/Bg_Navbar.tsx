"use client";
import { useEffect, useState } from "react";

const Bg_Navbar = ({ children }: { children: React.ReactNode }) => {
  const [scroll, setScroll] = useState(false);

  const handleScroll = () => {
    setScroll(window.pageYOffset !== 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${
        scroll ? "shadow-lg dark:bg-secondary bg-primary" : "bg-transparent"
      } fixed z-[1020] top-0 w-full max-w-screen-xl flex items-center justify-between max-xs:px-4 px-7 py-4`}
    >
      {children}
    </header>
  );
};

export default Bg_Navbar;

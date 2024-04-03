"use client";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useUserContext } from "@/context/MyState";

const Btn_Dark = () => {
  const { dark, setDark }: any = useUserContext();

  const handleDark = () => {
    const newDarkMode = !dark;
    if (typeof window !== "undefined") {
      localStorage.setItem("dark", JSON.stringify(newDarkMode)!);
    }
    setDark(newDarkMode);
  };

  return (
    <span onClick={handleDark} className="cursor-pointer">
      {dark ? <MdDarkMode size={30} /> : <MdLightMode size={30} />}
    </span>
  );
};

export default Btn_Dark;

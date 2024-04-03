"use client";
import { handleLogin, handleSignUp } from "@/constant/api";
import { useUserContext } from "@/context/MyState";
import { Loader_icon } from "@/public/assets";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IForm } from "@/types";

type IForm_log_In_Up = {
  title: "Log In" | "Sign Up";
  InputLog_In_Up: {
    type: string;
    name: string;
  }[];
};

const Form_log_In_Up = ({ title, InputLog_In_Up }: IForm_log_In_Up) => {
  const { userEmail, setUserEmail, setUserId }: any = useUserContext();
  const [disable, setDisable] = useState<boolean>(false);
  const { push } = useRouter();

  const [form, setForm] = useState<IForm | any>({
    password: "",
    email: userEmail || "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((pre: IForm) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title == "Sign Up") {
      return await handleSignUp(form, push, setDisable, setUserEmail);
    }
    return await handleLogin(form, push, setUserId, setDisable, setUserEmail);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {InputLog_In_Up.map((item) => (
        <input
          key={item.type}
          type={item.type}
          name={item.name}
          value={form[item.name]}
          onChange={handleChange}
          placeholder={item.name}
          className="border border-green dark:bg-gray bg-primary outline-0 sm:text-sm rounded-lg w-full p-2.5"
        />
      ))}
      <button
        disabled={disable}
        type="submit"
        className={`${
          disable ? "cursor-not-allowed opacity-50" : ""
        } hover:shadow-[inset_0_0_8px_rgb(250,245,255)] border-b-4 border-green bg-dark_admin text-green rounded-lg text-xl hover:shadow-green text-center mb-2 w-full font-bold px-2 py-2 flex items-center gap-3 justify-center`}
      >
        {!disable ? (
          ""
        ) : (
          <Image src={Loader_icon} alt="loader icon" width={20} height={20} />
        )}
        {title}
      </button>
    </form>
  );
};

export default Form_log_In_Up;

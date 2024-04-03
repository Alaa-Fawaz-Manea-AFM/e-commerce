import { InputLogIn } from "@/constant/Constant";
import { Form_log_In_Up } from "@/components";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Log In",
  description: "Ecommerce Log In Page",
};

const LoginPage = () => (
  <div className="dark:bg-secondary dark:text-white bg-primary text-secondary flex items-center flex-col w-full h-screen">
    <div className="dark:border-green border-secondary border mt-40 absolute max-xs:px-5 px-8 pt-5 pb-5 flex flex-col gap-5 max-ss:w-4/5 ss:w-[512px] rounded-2xl">
      <Link
        href="/"
        className="text-3xl text-center font-semibold hover:underline"
      >
        E-Commerce
      </Link>
      <h2 className="text-3xl text-center">Log In</h2>
      <Form_log_In_Up title="Log In" InputLog_In_Up={InputLogIn} />
      <section className="flex items-center">
        Do you want an account?{" "}
        <Link href="/sign-up" className="text-red font-semibold">
          Sign Up
        </Link>
      </section>
    </div>
  </div>
);

export default LoginPage;

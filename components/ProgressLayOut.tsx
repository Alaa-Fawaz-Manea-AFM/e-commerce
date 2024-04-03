"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useUserContext } from "@/context/MyState";

const ProgressLayOut = ({ children }: { children: React.ReactNode }) => {
  const { dark }: any = useUserContext();

  const themeClass = dark
    ? "dark bg-secondary text-white"
    : "light bg-primary text-secondary";

  return (
    <main className={themeClass}>
      <ProgressBar
        height="3px"
        color="#22C55E"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <div className="max-w-screen-xl min-h-screen overflow-hidden mx-auto flex flex-col justify-between">
        {children}
      </div>
    </main>
  );
};

export default ProgressLayOut;

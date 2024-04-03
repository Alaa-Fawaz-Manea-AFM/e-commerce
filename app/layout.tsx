import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProgressLayOut } from "@/components";
import { Roboto } from "next/font/google";
import MyState from "@/context/MyState";
import "./globals.css";
import { Metadata } from "next";

const roboto = Roboto({ subsets: ["latin"], weight: ["700"] });

export const metadata: Metadata = {
  title: {
    default: "e-commerce",
    template: "e-commerce - %s",
  },
  description: "Ecommerce Home Page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <MyState>
          <ProgressLayOut>
            <div className="min-h-screen">{children}</div>
          </ProgressLayOut>
        </MyState>
        <ToastContainer />
      </body>
    </html>
  );
}

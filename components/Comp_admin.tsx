"use client";
import { AdminUsers, AdminOrders, AdminProduct } from "@/components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useUserContext } from "@/context/MyState";
import { adminTab } from "@/constant/Constant";
import { FaUserTie } from "react-icons/fa";
import { ISearchParams } from "@/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import { validEmail } from "@/constant/api";

const Comp_admin = ({ limit, page, search }: ISearchParams) => {
  const { user, userInf, product }: any = useUserContext();

  if (userInf.user) {
    if (userInf?.user?.email !== validEmail) return notFound();
  }
  return (
    <div className="overflow-y-auto body-font mt-20">
      <div className="container px-5 mx-auto mb-10 flex justify-center flex-wrap -m-4 text-center">
        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
          <section className="font-medium border-b-4 hover:shadow-[inset_0_0_8px_rgb(250,245,255)] transition-all duration-300 ease-in-out hover:shadow-purple border-purple text-purple rounded-lg text-xl px-5 py-1.5 text-center bg-dark_admin">
            <span className="w-12 h-12 mb-3 inline-block">
              <FaUserTie size={50} />
            </span>
            <h2 className="title-font dark:text-white text-secondary font-medium text-3xl">
              {product?.length}
            </h2>
            <p>Total Products</p>
          </section>
        </div>
        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
          <section
            className="
          hover:shadow-[inset_0_0_8px_rgb(250,245,255)] transition-all duration-300 ease-in-out font-medium border-b-4 border-pink text-pink hover:shadow-pink rounded-lg text-xl px-5 py-1.5 text-center bg-dark_admin"
          >
            <span className="w-12 h-12 mb-3 inline-block">
              <FaUserTie size={50} />
            </span>
            <h2 className="title-font dark:text-white text-secondary font-medium text-3xl">
              0
            </h2>
            <p>Total Orders</p>
          </section>
        </div>
        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
          <section
            className="hover:shadow-[inset_0_0_8px_rgb(250,245,255)] transition-all duration-300 ease-in-out text-center 
          font-medium border-b-4 border-green text-green rounded-lg text-xl hover:shadow-green  px-5 py-1.5 text-centers bg-dark_admin"
          >
            <div className="w-12 h-12 mb-3 inline-block">
              <FaUserTie size={50} />
            </div>
            <h2 className="title-font font-medium dark:text-white text-secondary text-3xl fonts1">
              {user?.length}
            </h2>
            <p>Total Users</p>
          </section>
        </div>
      </div>
      <div className="container max-w-[1400px] mx-auto">
        <Tabs defaultIndex={0}>
          <TabList className="flex items-center justify-center flex-wrap md:space-x-8 text-center gap-4 mb-10">
            {adminTab?.map((tab, index) => (
              <Tab name={tab.title} key={index}>
                <div
                  className={`${tab.class} 
                  hover:shadow-[inset_0_0_8px_rgb(250,245,255)] transition-all duration-300 ease-in-out font-medium border-b-2 rounded-lg text-xl px-5 py-1.5 text-center cursor-pointer bg-dark_admin`}
                >
                  <Link href="/admin" className="flex gap-2 items-center">
                    <span>{tab.icon}</span>
                    <span>{tab.title}</span>
                  </Link>
                </div>
              </Tab>
            ))}
          </TabList>
          <TabPanel>
            <AdminProduct
              page={+page}
              limit={+limit}
              search={search!}
              product={product}
            />
          </TabPanel>
          <TabPanel>
            <AdminOrders page={+page} limit={+limit} />
          </TabPanel>
          <TabPanel>
            <AdminUsers page={+page} limit={+limit} users={user} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Comp_admin;

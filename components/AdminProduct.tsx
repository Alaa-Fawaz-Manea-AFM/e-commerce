"use client";
import { deleteProduct, sliceDataProAndUserAndOrder } from "@/constant/api";
import { adminTabPanelProduct } from "@/constant/Constant";
import { IProduct, ISearchParams } from "@/types";
import { MdDeleteForever } from "react-icons/md";
import { LiaEditSolid } from "react-icons/lia";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Paginations from "./Paginations";
import Image from "next/image";
import Link from "next/link";

type IAdminPro = {
  product: IProduct[];
};

const AdminProduct = ({
  limit,
  page,
  search,
  product,
}: IAdminPro & ISearchParams) => {
  const router = useRouter();
  const [_search, set_Search] = useState(search || "");

  const handleDeleteProduct = async (id: string) => await deleteProduct(id);

  const [profinal, setProfinal] = useState<IProduct[]>([]);
  const [length, setLength] = useState(0);

  useEffect(() => {
    let proFilter = product?.filter((arr: IProduct) =>
      arr.title.toLowerCase().includes(_search.toLowerCase())
    );

    const { dataFinal, length } = sliceDataProAndUserAndOrder(
      page,
      limit,
      proFilter
    );
    setProfinal(dataFinal);
    setLength(length);
  }, [page, limit, _search, product]);

  const handleRouter = (e: any) => {
    let Reg = /[a-zA-Z0-9]/gi.test(_search);
    if (Reg && (e.key === "Enter" || e === "search")) {
      return router.push(`?page=${page}&limit=${limit}&search=${_search}`);
    }
    if (_search.length == 0) {
      return router.push(`?page=${page}&limit=${limit}`);
    }
  };

  return (
    <div className="py-10 w-[90%] mx-auto">
      <div className="grid grid-cols-3 gap-5">
        <div className="flex items-center gap-2 col-span-2 max-ss:col-span-3">
          <div className="flex w-full items-center gap-2">
            <button
              name="btn search"
              type="button"
              onClick={() => handleRouter("search")}
            >
              <CiSearch name="icn search" size={25} />
            </button>
            <input
              value={_search}
              onChange={(e) => set_Search(e.target.value)}
              onKeyUp={handleRouter}
              placeholder="Search By Name..."
              type="text"
              className="w-full outline-none p-2 font-medium bg-transparent"
            />
          </div>
          {_search ? (
            <button
              type="button"
              onClick={() => {
                router.push(`?page=${page}&limit=${limit}`);
                set_Search("");
              }}
            >
              <IoMdClose size={30} />
            </button>
          ) : (
            ""
          )}
        </div>
        <Link
          href="/admin/add-product"
          className="ml-auto w-fit col-span-1 max-ss:col-span-3 hover:shadow-[inset_0_0_8px_rgb(250,245,255)] transition-all duration-300 ease-in-out font-medium border-b-4 border-green bg-dark_admin text-green rounded-lg text-xl hover:shadow-green px-5 py-1.5 mb-2"
        >
          Add Product
        </Link>
      </div>
      <div className="overflow-scroll w-full dark:bg-gray bg-primary">
        <table className="text-sm w-full border border-secondary">
          <thead className="text-xs uppercase shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]">
            <tr>
              {adminTabPanelProduct?.map((tab, i) => (
                <th key={i} scope="" className="px-6 py-3">
                  {tab}
                </th>
              ))}
            </tr>
          </thead>
          {profinal?.map((prod, index) => {
            const { title, price, images, category, date, id } = prod;
            return (
              <tbody key={index}>
                <tr className="border-b dark:border-gray_tx text-center">
                  <td className="px-6 py-4">{++index}.</td>

                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    <Image
                      width={56}
                      height={56}
                      className="object-contain rounded-sm w-14 max-h-14 h-14"
                      src={images?.[0]}
                      alt={title}
                    />
                  </td>
                  <td className="px-6 py-4 text-start">
                    {title.length > 50 ? `${title.slice(0, 50)}...` : title}
                  </td>
                  <td className="px-6 py-4">
                    <sup>$</sup>
                    {price}
                  </td>
                  <td className="px-6 py-4">
                    {category.length > 40
                      ? `${category.slice(0, 40)}...`
                      : category}
                  </td>
                  <td className="px-6 py-4">{date}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <div className="flex gap-2 cursor-pointer">
                        <div onClick={() => handleDeleteProduct(id)}>
                          <MdDeleteForever size={30} />
                        </div>
                        <Link href={`/admin/${id}`}>
                          <LiaEditSolid name={id} size={30} />
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      {length ? (
        <Paginations
          productLength={length}
          page={page}
          limit={limit}
          search={search}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default AdminProduct;

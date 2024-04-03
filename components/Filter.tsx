"use client";
import { usePathname } from "next/navigation";
import { filterPricAndCattegory } from "@/constant/api";
import { useUserContext } from "@/context/MyState";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { ISearchParams } from "@/types";
import Link from "next/link";

const Filter = ({ search, price, category, page, limit }: ISearchParams) => {
  const { product }: any = useUserContext();
  const [_search, set_Search] = useState<string>(search || "");
  const [_price, set_Price] = useState<string[]>([]);
  const [_category, set_Category] = useState<string[]>([]);

  const pathname = usePathname();
  const { push } = useRouter();

  const handleRouter = (value: string, parameter: string) => {
    const _search_Str = parameter === "search";
    const _category_Str = parameter === "category";
    const queryParams = {
      page: parameter === "page" ? value.toString() : page.toString(),
      limit: parameter === "limit" ? value.toString() : limit.toString(),
      search: _search_Str ? value : _search,
      category: _category_Str ? value : _search_Str ? "" : category!,
      price:
        parameter === "price"
          ? value
          : _category_Str || _search_Str
          ? ""
          : price!,
    };

    const queryString = new URLSearchParams(queryParams).toString();
    push(`?${queryString}`);
  };

  const resetPathname = () => {
    push(pathname);
    set_Search('')
  };

  useEffect(() => {
    filterPricAndCattegory(
      product,
      set_Price,
      search!,
      category!,
      set_Category
    );
  }, [product, search, price, category]);

  return (
    <div className="border-green p-5 rounded-lg drop-shadow-xl max-w-2xl mx-auto mt-5 border">
      <label className="border border-green text-green w-full outline-none p-2 rounded-md font-medium bg-transparent items-center flex">
        <CiSearch size={30} className="cursor-pointer" />
        <input
          value={_search}
          onChange={(e) => {
            const { value } = e.target;
            handleRouter(value, "search");
            set_Search(value);
          }}
          placeholder="Search..."
          type="text"
          className="w-full outline-none border-none  p-2 font-medium bg-transparent"
        />
        {_search ? (
          <button onClick={resetPathname} className="cursor-pointer">
            <IoMdClose size={30} />
          </button>
        ) : (
          ""
        )}
      </label>
      <div className="flex items-center justify-between mt-4">
        <h1 className="font-medium">Filters</h1>
        <button
          type="button"
          onClick={resetPathname}
          className="border border-green px-4 py-2 rounded-md text-sm font-semibold cursor-pointer"
        >
          Reset Filter
        </button>
      </div>
      <form className="grid grid-cols-2 max-xs:grid-cols-1 gap-4 mt-4">
        <select
          value={category}
          aria-label="AllPrice"
          onChange={(e) => {
            handleRouter(e.target.value, "category");
          }}
          className="dark:bg-gray dark:focus:bg-gary focus:border-gray bg-primary focus:bg-primary border-primary xxs:px-4 py-3 w-full rounded-md outline-0 text-sm"
        >
          <option value="">All Category</option>
          {_category?.map((cate) => (
            <option key={cate} value={cate}>
              {cate}
            </option>
          ))}
        </select>
        <select
          aria-label="AllPrice"
          value={price}
          onChange={(e) => handleRouter(e.target.value, "price")}
          className="dark:bg-gray dark:focus:bg-gary focus:border-gray bg-primary focus:bg-primary border-primary xxs:px-4 py-3 w-full rounded-md outline-0 text-sm"
        >
          <option value="">All Price</option>
          {_price?.map((pric) => (
            <option key={pric} value={pric}>
              ${pric}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default Filter;

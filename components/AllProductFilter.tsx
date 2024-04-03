"use client";
import { filterAllDataFromAllProduct } from "@/constant/api";
import { useUserContext } from "@/context/MyState";
import { IProduct, ISearchParams } from "@/types";
import { Paginations, ProductDiv } from ".";
import { useEffect, useState } from "react";

const AllProductFilter = ({
  search,
  price,
  category,
  page,
  limit,
}: ISearchParams) => {
  const { product }: any = useUserContext();
  const [profinal, setProfinal] = useState<IProduct[]>([]);
  const [length, setLength] = useState<number>(0);

  useEffect(() => {
    const sortedProducts = product.sort(
      (a: any, b: any) => b.title.length - a.title.length
    );
    const { dataFinal, length } = filterAllDataFromAllProduct(
      search!,
      price!,
      category!,
      page,
      limit,
      sortedProducts
    );
    setProfinal(dataFinal);
    setLength(length);
  }, [product, page, limit, search, price, category]);

  return (
    <div className="my-10 mx-auto  overflow-hidden w-full">
      <div className="flex flex-wrap gap-5 justify-center">
        {profinal?.length == 0 && (search || category || price) ? (
          <p className="dark:text-white">
            There are no products with this name{" "}
            <b className="text-green">{search || category}</b>
          </p>
        ) : (
          ""
        )}
        {profinal?.map((prod) => (
          <div key={prod.id}>
            <ProductDiv prod={prod} />
          </div>
        ))}
      </div>
      {length > 0 ? (
        <Paginations
          price={price}
          limit={+limit}
          page={+page}
          search={search}
          category={category}
          productLength={+length}
          noAdmin
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default AllProductFilter;

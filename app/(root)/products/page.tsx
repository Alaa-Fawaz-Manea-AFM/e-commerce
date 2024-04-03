import { Filter, AllProductFilter } from "@/components";
import { ISearchParams } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Ecommerce Products Page",
};

type IProducts = {
  searchParams: ISearchParams;
};
const AllProducts = ({
  searchParams: {
    page = 1,
    limit = 5,
    price = "",
    search = "",
    category = "",
  },
}: IProducts) => (
  <div className="mt-28">
    <div className="w-[600px] max-ss:w-[85%] mx-auto">
      <Filter
        search={search}
        price={price}
        category={category}
        page={page}
        limit={limit}
      />
    </div>

    <AllProductFilter
      search={search}
      price={price}
      category={category}
      page={page}
      limit={limit}
    />
  </div>
);

export default AllProducts;

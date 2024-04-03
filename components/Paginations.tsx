import OptionsPaginatin from "./OptionsPaginatin";
import Link from "next/link";

type IPaginations = {
  page: number;
  limit: number;
  price?: string;
  search?: string;
  noAdmin?: boolean;
  category?: string;
  productLength: number;
};

const Paginations = ({
  noAdmin,
  page,
  limit,
  price,
  search,
  category,
  productLength,
}: IPaginations) => {
  let checkSearch = `${search ? `&search=${search}` : ""}${
    category ? `&category=${category}` : ""
  }${price ? `&price=${price}` : ""}`;

  const totalPage = Math.ceil(productLength / limit);

  page = Math.max(1, Math.min(page, totalPage));

  let pageNumber = [];

  for (let i = page - 3; i < page + 3; i++) {
    if (i < 1) continue;
    if (i > totalPage) break;
    pageNumber.push(+i);
  }

  let check_noAdmin = noAdmin ? checkSearch : `&search=${search}`;

  return (
    <div className="mt-20 pb-5 gap-2 flex justify-center w-full items-center">
      <OptionsPaginatin
        page={page}
        limit={limit}
        lengthData={productLength}
        checkSearch={check_noAdmin}
      />

      <div className="">
        {page > 3 ? (
          <Link href={`?page=1&limit=${limit}${check_noAdmin}`}>{"<<"}</Link>
        ) : (
          ""
        )}
        {pageNumber.map((i) => (
          <Link
            key={i}
            href={`?page=${i}&limit=${limit}${check_noAdmin}`}
            className={`${
              i == page ? "text-red border border-green" : ""
            } text-center rounded-xl px-3 py-1`}
          >
            {i}
          </Link>
        ))}
        {page < totalPage && totalPage > 3 ? (
          <Link href={`?page=${totalPage}&limit=${limit}${check_noAdmin}`}>
            {">>"}
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Paginations;

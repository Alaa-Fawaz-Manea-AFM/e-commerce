"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

type IOptionsPaginations = {
  page: number;
  limit: number;
  lengthData: number;
  checkSearch: string;
};

const OptionsPaginatin = ({
  page,
  limit,
  lengthData,
  checkSearch,
}: IOptionsPaginations) => {
  const { push } = useRouter();

  const handleOptions = (e: ChangeEvent<HTMLSelectElement>) => {
    let value = +e.target.value;
    const lengthOptions = Math.ceil(lengthData / value);
    let options = page > lengthOptions ? lengthOptions : page;
    push(`?page=${options}&limit=${value}${checkSearch}`);
  };
  return (
    <select
      aria-label="select numbers product"
      value={limit}
      onChange={handleOptions}
      className="dark:bg-gray bg-primary
        border-primary  focus:outline-offset-0 ring-1 ring-inset max-xxs:w-4/5 px-2 py-1.5 ring-gray-300"
    >
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
    </select>
  );
};

export default OptionsPaginatin;

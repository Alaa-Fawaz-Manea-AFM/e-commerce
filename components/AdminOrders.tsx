"use client";
import { adminTabPanelOrder, orderObj } from "@/constant/Constant";
import { sliceDataProAndUserAndOrder } from "@/constant/api";
import { useEffect, useState } from "react";
import Paginations from "./Paginations";
import { IOrderObj, ISearchParams } from "@/types";
import Image from "next/image";

const AdminOrders = ({ limit, page }: ISearchParams) => {
  const [length, setLength] = useState<number>(0);
  const [orderFinal, setOrderFinal] = useState<IOrderObj[]>([]);

  useEffect(() => {
    const { dataFinal, length } = sliceDataProAndUserAndOrder(
      page,
      limit,
      orderObj
    );
    setOrderFinal(dataFinal);
    setLength(length);
  }, [page, limit, orderObj]);

  return (
    <div className="py-10 w-[90%] overflow-x-auto mx-auto">
      <div className="overflow-scroll w-full dark:bg-gray bg-primary">
        <table className="text-sm w-full border border-secondary">
          <thead className="text-xs uppercase shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]">
            <tr>
              {adminTabPanelOrder.map((tab, i) => (
                <th key={i} className="px-6 py-3">
                  {tab}
                </th>
              ))}
            </tr>
          </thead>
          {orderFinal.map((order, i) => {
            const {
              PaymentId,
              Img,
              Title,
              Price,
              Category,
              Name,
              Address,
              Pincode,
              PhoneNumber,
              Email,
              Date,
            } = order;
            return (
              <tbody key={i}>
                <tr className="border-b dark:border-gray_tx">
                  <td className="px-6 py-4">{PaymentId}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    <Image width={64} height={64} src={Img.src} alt={Title} />
                  </th>
                  <td className="px-6 py-4">
                    {Title.length > 20 ? `${Title.slice(0, 20)}...` : Title}
                  </td>
                  <td className="px-6 py-4">{Price}</td>
                  <td className="px-6 py-4">
                    {Category.length > 20
                      ? `${Category.slice(0, 20)}...`
                      : Category}
                  </td>

                  <td className="px-6 py-4">
                    {Name.length > 20 ? `${Name.slice(0, 20)}...` : Name}
                  </td>
                  <td className="px-6 py-4">{Address}</td>
                  <td className="px-6 py-4">{Pincode}</td>
                  <td className="px-6 py-4">{PhoneNumber}</td>
                  <td className="px-6 py-4">
                    {Email.length > 20 ? `${Email.slice(0, 20)}...` : Email}
                  </td>
                  <td className="px-6 py-4">{Date}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      {length ? (
        <Paginations productLength={+length} page={+page} limit={+limit} />
      ) : (
        ""
      )}
    </div>
  );
};

export default AdminOrders;

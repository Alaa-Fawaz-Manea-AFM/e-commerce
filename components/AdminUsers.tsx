"use client";
import { sliceDataProAndUserAndOrder } from "@/constant/api";
import { adminTabPanelUser } from "@/constant/Constant";
import { ISearchParams, IUser, IUsers } from "@/types";
import { useEffect, useState } from "react";
import Paginations from "./Paginations";

type IAdminUser = { users: IUsers[] };

const AdminUsers = ({ users, limit, page }: ISearchParams & IAdminUser) => {
  const [userFinal, setuserFinal] = useState<{ user: IUser }[]>([]);
  const [length, setLength] = useState<number>(0);

  useEffect(() => {
    const { dataFinal, length } = sliceDataProAndUserAndOrder(
      page,
      limit,
      users
    );
    setuserFinal(dataFinal);
    setLength(length);
  }, [page, limit, users]);

  return (
    <div className="w-[90%] mx-auto">
      <div className="overflow-scroll w-full dark:bg-gray bg-primary">
        <table className="text-sm w-full border border-secondary">
          <thead className="text-xs uppercase shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]">
            <tr>
              {adminTabPanelUser?.map((tab) => (
                <th key={tab} scope="" className="px-6 py-3">
                  {tab}
                </th>
              ))}
            </tr>
          </thead>
          {userFinal?.map(({ user }, index) => {
            const { name, uid, email, date } = user;
            return (
              <tbody key={index}>
                <tr className="border-b dark:border-gray_tx">
                  <td className="px-6 py-4">{index + 1}.</td>
                  <td className="px-6 py-4">
                    {name?.length > 20 ? `${name.slice(0, 20)}...` : name}
                  </td>
                  <td className="px-6 py-4">
                    {email?.length > 20 ? `${email.slice(0, 20)}...` : email}
                  </td>
                  <td className="px-6 py-4">
                    {uid?.length > 20 ? `${uid.slice(0, 20)}...` : uid}
                  </td>
                  <td className="px-6 py-4">{date}</td>
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

export default AdminUsers;

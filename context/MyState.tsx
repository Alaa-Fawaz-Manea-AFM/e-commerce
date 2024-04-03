"use client";
import { IProduct, IUsers } from "@/types";
import { getProductData, getUserData, getUserInfoAll } from "@/constant/api";
import {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type IValue = {
  dark: boolean;
  user: IUsers[];
  userId: string;
  userEmail: string;
  product: IProduct[];
  userInf: IUsers | object;
  setDark: React.Dispatch<SetStateAction<boolean>>;
  setUserId: React.Dispatch<SetStateAction<string>>;
  setProduct: React.Dispatch<SetStateAction<IProduct[]>>;
  setUserEmail: React.Dispatch<SetStateAction<string>>;
};

const MyContext = createContext<IValue | null>(null);

export const useUserContext = () => useContext(MyContext);

const MyState = ({ children }: { children: React.ReactNode }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");

  const [dark, setDark] = useState(false);
  const [product, setProduct] = useState<IProduct[]>([]);

  const [user, setUser] = useState<IUsers[]>([]);
  useEffect(() => {
    getUserData(setUser);
    getProductData(setProduct);
    setUserId(JSON.parse(localStorage.getItem("user")!));
    setDark(JSON.parse(localStorage.getItem("dark")!));
  }, []);

  const [userInf, setUserInf] = useState<IUsers | object>({});
  useEffect(() => {
    getUserInfoAll(user, userId, setUserInf);
  }, [userId, user]);

  const value: IValue = {
    dark,
    user,
    userId,
    userInf,
    setDark,
    product,
    setUserId,
    userEmail,
    setProduct,
    setUserEmail,
  };
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export default MyState;

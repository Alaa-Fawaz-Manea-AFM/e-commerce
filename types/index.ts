import { Timestamp } from "firebase/firestore";
import { StaticImageData } from "next/image";

export type IUsers = {
  cart: IProduct[];
  user: IUser;
};

export type IUser = {
  uid: string;
  name: string;
  date: string;
  email: string;
  time: Timestamp;
};

export type IProduct = {
  id: string;
  title: string;
  price: string;
  rating: string;
  time?: Timestamp;
  images: string[];
  discount: string;
  category: string;
  description: string;
  date: string;
};

export type IOrderObj = {
  PaymentId: string;
  Img: StaticImageData;
  Title: string;
  Price: string;
  Category: string;
  Name: string;
  Address: string;
  Pincode: string;
  PhoneNumber: string;
  Email: string;
  Date: string;
};

export type IForm = {
  name?: string;
  email: string;
  password: string;
};

export type ISearchParams = {
  page: number;
  limit: number;
  price?: string;
  search?: string;
  category?: string;
};

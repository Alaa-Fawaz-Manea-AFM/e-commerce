import { Comp_cart } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "Ecommerce Cert Page",
};

const CartPage = () => <Comp_cart />;

export default CartPage;

import { Comp_product_info } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Ecommerce Products Page",
};

const ProductInfo = ({
  params: { productId },
}: {
  params: { productId: string };
}) => <Comp_product_info productId={productId} />;

export default ProductInfo;

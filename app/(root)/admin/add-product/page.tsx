import { Form_add_And_Update_Prod, Modal } from "@/components";
import { AiOutlineClose } from "react-icons/ai";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Add Product",
  description: "Ecommerce Add Product Page",
};

const AddProductPage = () => (
  <Modal>
    <div className="relative dark:bg-secondary dark:border dark:border-white dark:text-white bg-primary gap-5 max-w-screen-ss w-[95%] rounded-2xl shadow-xl py-8 px-5 xs:px-10 overflow-y-auto max-h-[95vh]">
      <Link aria-label="close" href="/admin">
        <AiOutlineClose className="absolute right-2 cursor-pointer max-xxs:top-7 top-5 max-xxs:h-7 h-10 w-10 z-[10]" />
      </Link>
      <h1 className="text-center text-2xl mb-4 font-semibold">Add Product</h1>
      <Form_add_And_Update_Prod title="Add" />
    </div>
  </Modal>
);

export default AddProductPage;

import { Comp_admin } from "@/components";
import { ISearchParams } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Ecommerce admin Page",
};

const AdminPage = ({
  searchParams: { limit = 5, page =1, search='' },
}: {
  searchParams: ISearchParams;
}) => <Comp_admin limit={limit } page={page} search={search} />;

export default AdminPage;

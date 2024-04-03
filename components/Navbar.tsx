import { Bg_Navbar, Btn_Cart, Btn_Dark, NavLink, Toggle_Navbar } from ".";
import Link from "next/link";

const Navbar = () => (
  <Bg_Navbar>
    <div className="flex items-center gap-2">
      <Toggle_Navbar />
      <Link
        href="/"
        className="text-3xl max-xxs:text-2xl font-semibold hover:underline"
      >
        E-Commerce
      </Link>
    </div>

    <div className="flex items-center gap-2">
      <section className="flex items-center gap-2 max-sm:hidden">
        <NavLink />
      </section>

      <section className="flex items-center gap-2">
        <Btn_Dark />
        <Btn_Cart />
      </section>
    </div>
  </Bg_Navbar>
);

export default Navbar;

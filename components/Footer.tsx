import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";
import Link from "next/link";

const Footer = () => {
  let year = new Date().getFullYear();
  return (
    <footer className="border-t-2 dark:bg-gray border-gray_tx pb-2">
      <section className="container px-5 py-3 mx-auto flex items-center sm:flex-row flex-col">
        <Link href="/" className="flex">
          <h1 className="text-2xl font-bold  px-2 py-1 rounded link">
            E-Commerce
          </h1>
        </Link>
        <p className="text-sm sm:ml-6 sm:mt-0 mt-4">
          © {year} E-Commerce —
          <Link href="/" className="xxs:ml-2" target="_blank">
            www.ecommerce.com
          </Link>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <div className="flex gap-2 items-center">
            <FaFacebook size={25} aria-label="Facebook" />
            <IoLogoTwitter size={25} aria-label="Twitter" />
            <FaInstagram size={25} aria-label="Instagram" />
            <FaLinkedin size={25} aria-label="LinkedIn" />
          </div>
        </span>
      </section>
    </footer>
  );
};

export default Footer;

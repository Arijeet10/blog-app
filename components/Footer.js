import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className=" bottom-0 w-full bg-black text-white p-8 flex flex-col items-center gap-4">
        <div className="text-2xl font-medium">By ARIJEET SARKAR</div>
        <div className="flex items-center justify-center gap-2">
          <Link href="https://twitter.com/" target="_blank">
            <FaXTwitter className="w-10 h-10 p-1 rounded-full hover:border-white hover:border" />
          </Link>
          <Link href="https://www.linkedin.com/" target="_blank">
            <FaLinkedin className="w-7 h-7 bg-blue-600 rounded-sm hover:border-white hover:border" />
          </Link>
          <Link href="https://www.facebook.com/" target="_blank">
            <FaFacebook className="w-7 h-7 bg-blue-600 rounded-full hover:border-white hover:border" />
          </Link>
          <Link href="https://www.instagram.com/" target="_blank">
            <FaInstagramSquare className="w-7 h-7 bg-[#ff003d] rounded-sm hover:border-white hover:border" />
          </Link>
        </div>
        <div className="text-sm font-light">
          © 2024 Arijeet Sarkar, All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Footer;

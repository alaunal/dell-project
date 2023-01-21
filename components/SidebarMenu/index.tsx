import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { HiMenu, HiOutlineX } from "react-icons/hi";

const SidebarMenu = () => {
  const router = useRouter();

  const pathName = router.pathname.split("/");

  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <>
      <aside
        className={`flex flex-col justify-between z-10 min-h-full transition-all max-w-sm fixed bg-slate-200 rounded-tr-3xl rounded-br-3xl w-72 top-0 ${
          toggle ? "left-0" : "-left-72"
        } lg:left-0 `}
      >
        <div className="flex justify-center w-full mt-12 flex-col">
          <div className="mb-12 font-extrabold text-violet-600 text-4xl leading-none px-8">
            ADMIN <br />
            <span className="font-light text-gray-600 text-3xl">Products.</span>
          </div>
          <nav className="px-3">
            <ul>
              <li
                className={`mb-3 block bg-violet-50 rounded-lg cursor-pointer px-4 font-semibold ${
                  pathName[1] === ""
                    ? "border-l-4 border-violet-600 text-slate-800"
                    : "text-slate-600 hover:text-white hover:bg-violet-400"
                } `}
              >
                <Link href="/" className="block py-3">
                  Product
                </Link>
              </li>
              <li
                className={`mb-3 block bg-violet-50 rounded-lg cursor-pointer px-4 font-semibold ${
                  pathName[1] === "carts"
                    ? "border-l-4 border-violet-600 text-slate-800"
                    : "text-slate-600 hover:text-white hover:bg-violet-400"
                } `}
              >
                <Link href="/carts" className="block py-3">
                  Carts
                </Link>
              </li>
              <li
                className={`mb-3 block bg-violet-50 rounded-lg cursor-pointer px-4 font-semibold ${
                  pathName[1] === "about"
                    ? "border-l-4 border-violet-600 text-slate-800"
                    : "text-slate-600 hover:text-white hover:bg-violet-400"
                } `}
              >
                <Link href="/about" className="block py-3">
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex justify-center w-full mt-4 mb-8 text-sm text-gray-600">
          copyright @alaunal <strong className="ml-1">source code</strong>
        </div>

        <div className="absolute -right-14 top-5 md:inline-block lg:hidden">
          <button
            className={`h-12 w-12 flex rounded-full ${toggle ? "bg-red-500" : "bg-slate-800"} text-white font-2xl justify-center items-center transition-colors`}
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? <HiOutlineX /> : <HiMenu />}
          </button>
        </div>
      </aside>
    </>
  );
};

export default SidebarMenu;

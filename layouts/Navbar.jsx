import Title from "@components/Title";
import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { useState } from "react";
import Link from "next/link";
import { authContext, useAuth } from "@context/AuthContext";
import { useRouter } from "next/router";
import { auth } from "@libs/firebase";
import { Cable } from "lucide-react";
import { Inter } from "next/font/google";
import Image from "next/image";
import { LogOutIcon } from "lucide-react";
import "animate.css";

const inter = Inter({
  subsets: ["latin-ext"],
});

const Navbar = ({ children }) => {
  const [navbarOculta, setNavbarOculta] = useState(true);
  // const { push } = useRouter();
  const { user, logout } = useAuth();

  const ocultarNavbar = () => {
    setNavbarOculta(!navbarOculta);
  };

  // async function signUserOut() {
  //   await signOut(auth).then(() => push('/'));
  // }

  let display;

  switch (navbarOculta) {
    case true:
      display = "hidden relative -mt-[85px]";
      break;
    case false:
      display =
        "block mt-[0px] transition-all ease-in-out delay-150 duration-300";
      break;
  }

  return (
    <div
      className={`min-h-screen flex flex-col bg-slate-50 ${inter.className}`}
    >
      <nav
        className={`flex gap-14 items-center w-full bg-white ${
          user ? "inline-flex" : "hidden"
        }  pt-4 px-6`}
      >
        <Link href={"/"}>
          <Image
            className="cursor-pointer animate__animated animate__fadeInLeft hover:opacity-70 transition-all duration-200 ease-in-out"
            src="https://o.remove.bg/downloads/36fc9ab4-1aff-43ce-8c6c-80f1e41de6d7/MPH_1-removebg-preview.png"
            width={200}
            height={100}
            alt="Municipalidad Provincial de Huancayo"
          />
        </Link>
        {user ? (
          <div className="inline-block lg:hidden">
            <button
              className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white"
              onClick={ocultarNavbar}
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
        ) : (
          ""
        )}

        <div className={`w-full ${display}  lg:flex lg:-mt-2 lg:py-0 `}>
          {user ? (
            <div className="text-sm flex gap-5">
              <Link
                href="/save_document"
                className=" lg:inline-block hover:font-black hover:text-verde  duration-200    "
              >
                Registro
              </Link>
              <Link
                href="/search"
                className="lg:inline-block  hover:font-black hover:text-verde    duration-200   "
              >
                Búsqueda
              </Link>
              <button
                onClick={logout}
                href="#responsive-header"
                title="Cerrar Sesión"
                className=" flex items-center text-sm gap-1 hover:font-black hover:text-verde    duration-200    "
              >
                Cerrar Sesión
                <LogOutIcon size={15} />
              </button>
            </div>
          ) : null}
        </div>
      </nav>
      {children}
    </div>
  );
};

export default Navbar;

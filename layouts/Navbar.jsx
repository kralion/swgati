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
        className={`flex items-center fixed w-screen ${
          user ? "justify-between" : "justify-center"
        } h-[85px] flex-wrap py-4 px-6`}
      >
        <Link className="flex  text-white gap-1 " href={"/"}>
          <Image
            src="https://www.munihuancayo.gob.pe/portal/images/MPH%201.jpg#joomlaImage://local-images/MPH%201.jpg?width=855&height=398"
            width={200}
            height={100}
            alt="Municipalidad Provincial de Huancayo"
          />
        </Link>
        {user ? (
          <div className="block lg:hidden">
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

        <div
          className={`w-full ${display} flex lg:flex items-start  lg:-mt-2 lg:w-auto  lg:py-0 py-4`}
        >
          {user ? (
            <div className="text-sm space-x-3  ">
              <Link
                href="/save_document"
                className=" lg:inline-block  hover:bg-green-200 py-1 px-3 rounded-md  duration-200  lg:-mt-0  "
              >
                Registro
              </Link>
              <Link
                href="/search"
                className="lg:inline-block  hover:bg-green-200  py-1 px-3 rounded-md duration-200  lg:mt-0  "
              >
                Búsqueda
              </Link>
            </div>
          ) : (
            ""
          )}
          {user ? (
            <div>
              <button
                onClick={logout}
                href="#responsive-header"
                title="Cerrar Sesión"
                className=" flex items-center text-sm  hover:bg-green-200  gap-2 py-1 px-3 rounded-md duration-200    "
              >
                Cerrar Sesión
                <LogOutIcon size={15} />
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
      {children}
    </div>
  );
};

export default Navbar;

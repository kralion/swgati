import { useAuth } from "@context/AuthContext";
import "animate.css";
import { LogOutIcon } from "lucide-react";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import LogoMuni from "../src/assets/logo-muni.png";
import styles from "./navbar.module.css";

const inter = Inter({
  subsets: ["latin-ext"],
});

const Navbar = ({ children }) => {
  const [navbarOculta, setNavbarOculta] = useState(true);
  const router = useRouter(); // Utiliza el hook useRouter
  const isCurrentPath = (path) => router.pathname === path;

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
    <div className={` flex flex-col ${styles.background}  ${inter.className}`}>
      <nav
        className={`flex gap-14 items-center w-full rounded-b-3xl bg-white ${
          user ? "inline-flex" : "hidden"
        }  pt-4 px-6`}
      >
        <Link href={"/"}>
          <Image
            className="cursor-pointer animate__animated animate__fadeInLeft hover:opacity-70 transition-all duration-200 ease-in-out"
            src={LogoMuni}
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

        <div className={` ${display}  lg:flex lg:-mt-2 lg:py-0 `}>
          {user ? (
            <div className="flex items-center lg:gap-[800px] gap-[400px] text-sm">
              <div className="flex gap-5">
                <Link
                  href="/save_document"
                  className={`lg:inline-block font-bold text-verde hover:opacity-60 duration-200 ${
                    isCurrentPath("/save_document")
                      ? "border-b-2 border-verde"
                      : ""
                  }`}
                >
                  Registros
                </Link>
                <Link
                  href="/search"
                  className={`lg:inline-block font-bold text-verde hover:opacity-60 duration-200 ${
                    isCurrentPath("/search") ? "border-b-2 border-verde" : ""
                  }`}
                >
                  Consultas
                </Link>
                <Link
                  href="/reportes"
                  className={`lg:inline-block font-bold text-verde hover:opacity-60 duration-200 ${
                    isCurrentPath("/reportes") ? "border-b-2 border-verde" : ""
                  }`}
                >
                  Estadísticas
                </Link>
              </div>
              <button
                onClick={logout}
                href="#responsive-header"
                title="Cerrar Sesión"
                className=" flex items-center gap-2 font-bold text-verde hover:opacity-60 duration-200    "
              >
                Salir
                <LogOutIcon size={15} />
              </button>
            </div>
          ) : null}
        </div>
      </nav>
      <div className={`p-10 ${styles.background}`}>{children}</div>
    </div>
  );
};

export default Navbar;

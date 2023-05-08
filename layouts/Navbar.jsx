import Title from '@components/Title';
import Logo from '@components/logo';
import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import logo from '../public/logo-muni.png';
import { useState } from 'react';
import Link from 'next/link';
import { authContext, useAuth } from '@context/AuthContext';
import { useRouter } from 'next/router';
import { auth } from '@libs/firebase';

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
      display = 'hidden relative -mt-[85px]';
      break;
    case false:
      display =
        'block mt-[0px] transition-all ease-in-out delay-150 duration-300';
      break;
  }

  return (
    <div className='min-h-screen flex flex-col bg-slate-50'>
      <nav
        className={`flex items-center fixed w-screen ${
          user ? 'justify-between' : 'justify-center'
        } h-[85px] flex-wrap bg-[#0E4D11] py-4 px-6 z-50`}
      >
        <div className='flex items-center flex-shrink-0 text-white mr-6'>
          <Logo img={logo} alt='logo' />
          <Link href={'/'}>
            <Title
              text={'Sistema de Archivos - MDP'}
              className={'text-2xl font-semibold -mt-2'}
            />
          </Link>
        </div>
        {user ? (
          <div className='block lg:hidden'>
            <button
              className='flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white'
              onClick={ocultarNavbar}
            >
              <svg
                className='fill-current h-3 w-3'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <title>Menu</title>
                <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
              </svg>
            </button>
          </div>
        ) : (
          ''
        )}

        <div
          className={`w-full ${display} flex-grow lg:flex lg:items-center lg:-mt-2 lg:w-auto bg-[#0E4D11] px-4 lg:py-0 py-4`}
        >
          {user ? (
            <div className='text-sm lg:flex-grow'>
              <Link
                href='/save_document'
                className='block mt-4 lg:inline-block lg:-mt-0 text-gray-200 hover:text-white mr-4 font-semibold text-lg'
              >
                Guardar
              </Link>
              <Link
                href='/search'
                className='block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4 font-semibold text-lg'
              >
                Buscar
              </Link>
            </div>
          ) : (
            ''
          )}
          {user ? (
            <div>
              <button
                onClick={logout}
                href='#responsive-header'
                className='inline-block text-sm px-5 py-3 font-semibold leading-none border rounded text-gray-100 bg-[#0B600F] s border-none shadow-sm shadow-[#0a450d] hover:border-transparent hover:text-[#0B600F] hover:bg-gray-300 mt-4 lg:mt-0'
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            ''
          )}
        </div>
      </nav>
      {children}
    </div>
  );
};

export default Navbar;

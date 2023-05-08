import logo from '/public/logo-muni.png';
import Button from '@components/Button';
import Input from '@components/Input';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

import { useAuth } from '@context/AuthContext';
import Head from 'next/head';

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  return (
    <>
      <Head>
        <title>Ingreso</title>
        <meta name="description" content="Generado en react" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col mt-[85px] lg:mt-0 lg:flex-row justify-between items-center bg-[#FEFFD0] h-screen relative pt-16">
        <div className=" lg:h-full w-full lg:w-1/2 bg-cover rounded-lg md:rounded-l-lg bg-[#e0e6dd] md:rounded-r-none text-center overflow-hidden relative flex justify-center">
          <div className="self-center lg:max-w-[540px] max-w-[320px]">
            <Image
              className="md:h-full object-cover min-w-[280px] min-h-full"
              src={logo}
              alt="image"
              width={540}
              height={540}
            />
          </div>
        </div>
        <div className=" p-8 m-auto flex w-50%">
          <div className="px-4 py-2 bg-[#FFFFFF]  shadow-2xl rounded-lg">
            <h1 className="text-2xl font-bold text-gray-700  text-center font-['Roboto'] normal ">
              MUNICIPALIDAD DISTRITAL DE
            </h1>
            <p className="text-2xl font-bold text-center pt-2 normal text-[#109A3A] text-[50px]">
              PANCÁN
            </p>
            <p className="text-2xl font-bold text-gray-700 text-center mt-[10px] pt-7">
              Ingresar
            </p>
            <form
              onSubmit={handleSubmit(({ email, password }) =>
                login(email, password)
              )}
              className="py-5 flex flex-col justify-center items-center"
            >
              <Input
                label="Correo electrónico:"
                name="email"
                display={"block"}
                id={"email"}
                placeholder={"asd@gmail.com"}
                register={register}
                required
              />
              <Input
                label="Contraseña*:"
                name="password"
                type="password"
                display={"block"}
                id={"contraseña"}
                placeholder={""}
                register={register}
                required
              />
              <div>
                <Button color="green" type="submit" text="Iniciar Sesión" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

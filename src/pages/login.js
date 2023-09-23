import Button from "@components/Button";
import Input from "@components/Input";
import Image from "next/image";
import { useForm } from "react-hook-form";

import { useAuth } from "@context/AuthContext";
import Head from "next/head";

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
      <div className="flex flex-col lg:mt-0 lg:flex-row justify-between items-center bg-[#EAB940] h-screen relative pt-16">
        <Image
          src="https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="image"
          width={800}
          height={800}
        />

        <div className=" p-10 m-auto flex w-50%">
          <div className="px-4 py-2 bg-[#FFFFFF]  shadow-2xl rounded-lg">
            <h1 className="text-2xl font-bold text-gray-700  text-center font-['Roboto'] normal ">
              MUNICIPALIDAD DISTRITAL DE
            </h1>
            <p className="text-2xl font-bold text-center pt-2 normal text-[#109A3A] text-[50px]">
              HUANCAYO
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

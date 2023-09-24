import Button from "@components/Button";
import Input from "@components/Input";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { AtSign } from "lucide-react";

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
      <div className="flex flex-col lg:mt-0 lg:flex-row justify-between items-center bg-gradient-to-br from-green-100 via-green-400 to-yellow-300 h-screen ">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Municipalidad_Provincial_de_Huancayo_Edificio_Peru.jpg"
          className="h-screen w-2/3"
          alt="image"
          width={800}
          height={800}
        />

        <div className="mx-auto flex flex-col ">
          <p className=" text-center">
            Sistema de Gestión de Activos TI | <strong>SWGATI</strong>
          </p>
          <div>
            <p className="text-xl font-bold text-center normal my-20 text-green-700 text-[50px]">
              Ingreso a la Plataforma
            </p>
            <form
              onSubmit={handleSubmit(({ email, password }) =>
                login(email, password)
              )}
            >
              <Input
                label="Correo electrónico"
                name="email"
                display={"block"}
                id={"email"}
                placeholder={"ramiro1992@gmail.com"}
                register={register}
                required
              />
              <Input
                label="Contraseña"
                name="password"
                type="password"
                display={"block"}
                id={"contraseña"}
                placeholder={""}
                register={register}
                required
              />

              <Button color="green" type="submit" text="Iniciar Sesión" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

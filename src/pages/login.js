import Button from "@components/Button";
import Input from "@components/Input";
import Image from "next/image";
import { useForm } from "react-hook-form";
import "animate.css";
import LogoMuni from "../assets/logo-muni.png";
import { Bebas_Neue } from "next/font/google";
import { useAuth } from "@context/AuthContext";

const bebasNeue = Bebas_Neue({
  subsets: ["latin-ext"],
  weight: ["400"],
});

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  return (
    <div className="flex flex-col lg:mt-0 lg:flex-row justify-between bg-gradient-to-br from-green-100 via-green-400 to-yellow-300 h-screen ">
      <Image
        src="https://munihuancayo.gob.pe/web_mph2023/images/DJI_0711.JPG"
        className="h-screen w-full lg:w-2/3"
        alt="image"
        width={800}
        height={800}
      />

      <div className="mx-auto animate__animated animate__fadeInDown flex flex-col mt-20 ">
        <Image
          className="cursor-pointer animate__animated animate__fadeInLeft hover:opacity-70 transition-all duration-200 ease-in-out "
          src={LogoMuni}
          width={300}
          height={300}
          alt="Municipalidad Provincial de Huancayo"
        />
        <h3>
          Sistema de Gestión de Activos TI -{" "}
          <strong className={`${bebasNeue.className} text-xl`}>SGATI</strong>
        </h3>
        <div>
          <h2 className="text-xl font-bold text-center normal my-20 text-green-700 text-[50px]">
            Ingreso a la Plataforma
          </h2>
          <form
            className="space-y-5"
            onSubmit={handleSubmit(({ email, password }) =>
              login(email, password)
            )}
          >
            <Input
              label="Correo electrónico"
              name="email"
              display={"block"}
              id={"email"}
              placeholder={"munihuancayo@gmail.com"}
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
  );
};

export default LoginPage;

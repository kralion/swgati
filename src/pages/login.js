import Button from "@components/Button";
import Input from "@components/Input";
import { useForm } from "react-hook-form";
import "animate.css";
import LogoMuni from "../assets/logo-muni.png";
import { Bebas_Neue } from "next/font/google";
import { useAuth } from "@context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";

const bebasNeue = Bebas_Neue({
  subsets: ["latin-ext"],
  weight: ["400"],
});

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const { login, error } = useAuth();
  const notify = () =>
    toast.error("Credenciales Incorrectas", {
      autoClose: 2000,
      pauseOnHover: true,
    });

  return (
    <div className="flex flex-col lg:mt-0 lg:flex-row justify-between bg-gradient-to-br from-green-100 via-green-400 to-yellow-300 h-screen ">
      <div
        style={{
          backgroundImage:
            "url('https://munihuancayo.gob.pe/web_mph2023/images/DJI_0711.JPG')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "50%",
          height: "100%",
        }}
      >
        <span className="absolute top-5 left-5">
          Developed by{" "}
          <Link
            href="https://twitter.com/brayanpaucar_"
            target="_blank"
            referrerPolicy="no-referrer"
            className="font-semibold  underline hover:opacity-80 transition-all duration-200 ease-in-out"
          >
            @BrayanPaucar
          </Link>
        </span>
      </div>

      <div className="mx-auto animate__animated animate__fadeInDown flex flex-col justify-center items-center ">
        <Image
          className="cursor-pointer animate__animated animate__fadeInLeft animate__delay-1s hover:opacity-70 transition-all duration-200 ease-in-out "
          src={LogoMuni}
          alt="Municipalidad Provincial de Huancayo"
          width={200}
          height={200}
        />
        <h3 className="text-black/50">
          Sistema Web de Gestión de Activos TI -{" "}
          <strong className={`${bebasNeue.className} text-xl`}>SWGATI</strong>
        </h3>
        <div>
          <h2 className="text-xl font-bold text-center normal my-20 text-green-700 text-[50px]">
            Ingreso a la Plataforma
          </h2>
          <form
            className="space-y-5 w-96"
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
              placeholder={"*************"}
              register={register}
              required
            />

            <Button color="success" type="submit" text="Iniciar Sesión" />
          </form>
        </div>
        <div className="animate__animated animate__fadeInUp animate__delay-2s absolute bottom-0 -right-28 bg-orange-400 rounded-t-xl p-4 text-sm shadow-lg">
          <div className="text-black">
            <p className="font-semibold mb-1">Credentials</p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              munihuancayo@gmail.com
            </p>
            <p>
              <span className="font-semibold">Contraseña:</span>{" "}
              munihuancayo2023
            </p>
          </div>
        </div>
      </div>
      {error && notify()}
      <ToastContainer />
    </div>
  );
};

export default LoginPage;

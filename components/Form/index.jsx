import Button from "@components/Button";
import Input from "@components/Input";
import InputOption from "@components/InputOption";
import Link from "next/link";

const Form = ({
  register,
  handleSubmit,
  onSubmit,
  setValue,
  watch,
  id,
  url,
}) => {
  const tiAssetOptionArray = [
    "Servidores",
    "Computadoras de Escritorio",
    "Laptops",
    "Impresoras y Escáneres",
    "Switches y Enrutadores",
    "Dispositivos de Almacenamiento",
    "Cámaras de Seguridad",
    "Software de Oficina",
    "Software de Seguridad",
    "Teléfonos IP",
  ];

  const typedocOptionArray = [
    "Solicitud",
    "Oficio",
    "Memorándum",
    "Cartas",
    "Costos",
    "Programa vaso de leche",
    "Informes",
    ,
    "Comprobantes de pago",
    "Resoluciones de alcaldía",
    "Ordenanzas municipales",
  ];

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="mx-auto w-full ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-7 grid-rows-7 content-start">
              <Input
                label="Código*:"
                name="codigo"
                display={"flex"}
                type={"name"}
                id={"codigo"}
                placeholder={"001-2023"}
                register={register}
                required
              />

              <Input
                label="Fecha*:"
                name="fecha"
                display={"flex"}
                type={"date"}
                placeholder={"Fecha"}
                register={register}
                required
              />
              <InputOption
                optionArray={tiAssetOptionArray}
                label="Activo TI*:"
                name="oficina"
                register={register}
                otheroption="otraOficina"
                photheroption="Ingrese otra Oficina"
                setValue={setValue}
                watch={watch}
              />
              <InputOption
                optionArray={typedocOptionArray}
                label="Tipo de doc*:"
                name="tipoDoc"
                register={register}
                otheroption="otroDocumento"
                photheroption="Ingrese otro Documento"
                setValue={setValue}
                watch={watch}
              />
              <Input
                label="Proveedor:"
                name="destinatario"
                display={"flex"}
                type={"name"}
                placeholder={"Nombre Completo"}
                register={register}
              />
              <Input
                label="Contrato*:"
                name="archivo"
                display={"flex"}
                type={"file"}
                placeholder={"Archivo"}
                register={register}
                required
              />
              <Input
                label="Acreedor:"
                name="solicitante"
                display={"flex"}
                type={"name"}
                placeholder={"Nombre Completo"}
                register={register}
              />
              <Input
                label="Descripcion:"
                name="asunto"
                display={"flex"}
                type={"name"}
                placeholder="Breve descripción del activo TI"
                register={register}
              />
            </div>
            <h3 className="my-7">(*) Estos campos son obligatorios</h3>

            <div className="grid grid-cols-3 gap-5  ">
              <Button color="blue" text="Limpiar" type="reset" />
              <Button color="green" text="Guardar Cambios" type="submit" />
              <Link href={id ? `/preview?id=${id}` : `/`}>
                <Button color="red" text="Cancelar" />
              </Link>
            </div>
          </form>
        </div>
        {url && (
          <Link href={`${url}`} target="_blank">
            <Button text={"Ver Documento anterior"} color={"blue"} />
          </Link>
        )}
      </div>
    </>
  );
};

export default Form;

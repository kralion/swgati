import Button from "@components/Button";
import Input from "@components/Input";
import InputOption from "@components/InputOption";

const FormS = ({ register, handleSubmit, onSubmit, setValue, watch }) => {
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
  const tiAssetDocumentTypes = [
    "Orden de Compra",
    "Contrato de Compra",
    "Licencia de Software",
    "Contrato de Arrendamiento",
    "Solicitud de Adquisición",
    "Cotización de Proveedores",
    "Acuerdo de Nivel de Servicio (SLA)",
    "Contrato de Mantenimiento",
    "Informe de Evaluación de Activos",
    "Factura de Compra",
    "Garantía del Fabricante",
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-7  content-start mt-3">
        <Input
          label="Código:"
          name="codigo"
          display={"flex"}
          type={"name"}
          placeholder={"000 - 999"}
          register={register}
        />
        <Input
          label="Asunto:"
          name="asunto"
          display={"flex"}
          type={"name"}
          placeholder={"ingrese el asunto"}
          register={register}
        />
        <Input
          label="Solicitante:"
          name="solicitante"
          display={"flex"}
          type={"name"}
          placeholder={"Ingrese el solicitante"}
          register={register}
        />
        <Input
          label="Fecha:"
          name="fecha"
          display={"flex"}
          type={"date"}
          register={register}
        />
        <div className="">
          <InputOption
            optionArray={tiAssetOptionArray}
            label="Tipo de Activo :"
            name="oficina"
            register={register}
            otheroption="otraOficina"
            photheroption="Ingrese la Oficina"
            setValue={setValue}
            watch={watch}
          />
        </div>
        <InputOption
          optionArray={tiAssetDocumentTypes}
          label="Tipo Contrato:"
          name="tipoDoc"
          register={register}
          otheroption="otroDocumento"
          photheroption="Ingrese el tipo"
          setValue={setValue}
          watch={watch}
        />
        <div></div>
        <Button color="success" text={"Buscar"} type={"submit"} />
      </div>
    </form>
  );
};
export default FormS;

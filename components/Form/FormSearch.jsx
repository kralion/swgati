import { set, useForm } from "react-hook-form";
import Button from "@components/Button";
import Input from "@components/Input";
import InputOption from "@components/InputOption";

const FormS = ({ register, handleSubmit, onSubmit, setValue, watch }) => {
  const officeOptionArray = [
    "",
    "Consejo municipal",
    "Alcaldía",
    "Secretaría general",
    "Trámite documentario",
    "Oficina de relaciones institucionales y comunicaciones",
    "Mesa de partes",
    "Gerencia municipal",
    "Unidad de tesorería",
    "Unidad de abastecimiento",
    "Unidad de gestión de recursos humanos",
    "Unidad de control patrimonial y almacén",
    "Unidad de rentas",
    "Oficina de contabilidad, planeamiento y presupuesto",
    "Oficina de asesoría legal",
    "Oficina de programación multianual de inversiones",
    "Subgerencia de desarrollo e inclusión social",
    "Unidad de programas sociales",
    "Unidad local de empadronamiento – SISFOH",
    "OMAPED",
    "DEMUNA",
    "Subgerencia de gestión ambiental y servicios municipales",
    "Unidad de medio ambiente y gestión de residuos sólidos",
    "Unidad de fiscalización",
    "Oficina de registro y estado civil",
    "Secretaría técnica de seguridad ciudadana y defensa civil",
    "Subgerencia, infraestructura y desarrollo urbano rural",
    "Unidad de obras públicas",
    "Área técnica municipal de los servicios de agua y saneamiento",
  ];

  const typedocOptionArray = [
    "",
    "Solicitud",
    "Oficio",
    "Memorándum",
    "Cartas",
    "Costos",
    "Programa vaso de leche",
    "Informes",
    "Requerimientos",
    "Planillas",
    "Cobro estipulado",
    "Recibo de ingresos",
    "Órdenes",
    "Planos",
    "Manera de pago",
    "Ordenanza",
    "Declaraciones juradas",
    "Conformidades",
    "Resoluciones",
    "Comprobantes de pago",
    "Resoluciones de alcaldía",
    "Ordenanzas municipales",
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 content-start mt-3">
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
            optionArray={officeOptionArray}
            label="Oficina:"
            name="oficina"
            register={register}
            otheroption="otraOficina"
            photheroption="Ingrese otra oficina"
            setValue={setValue}
            watch={watch}
          />
        </div>
        <InputOption
          optionArray={typedocOptionArray}
          label="Tipo documento:"
          name="tipoDoc"
          register={register}
          otheroption="otroDocumento"
          photheroption="Ingrese otro Documento"
          setValue={setValue}
          watch={watch}
        />
        <div className="row-start-4 row-end-5 col-start-2 col-end-3 w-2/5 mx-auto">
          <Button color={"blue"} text={"Buscar"} type={"submit"} />
        </div>
      </div>
    </form>
  );
};
export default FormS;

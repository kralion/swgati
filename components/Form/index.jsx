import Button from '@components/Button';
import Input from '@components/Input';
import InputOption from '@components/InputOption';
import Link from 'next/link';

const Form = ({
  register,
  handleSubmit,
  onSubmit,
  setValue,
  watch,
  id,
  url
}) => {
  const officeOptionArray = [
    'Consejo municipal',
    'Alcaldía',
    'Secretaría general',
    'Trámite documentario',
    'Oficina de relaciones institucionales y comunicaciones',
    'Mesa de partes',
    'Gerencia municipal',
    'Unidad de tesorería',
    'Unidad de abastecimiento',
    'Unidad de gestión de recursos humanos',
    'Unidad de control patrimonial y almacén',
    'Unidad de rentas',
    'Oficina de contabilidad, planeamiento y presupuesto',
    'Oficina de asesoría legal',
    'Oficina de programación multianual de inversiones',
    'Subgerencia de desarrollo e inclusión social',
    'Unidad de programas sociales',
    'Unidad local de empadronamiento – SISFOH',
    'OMAPED',
    'DEMUNA',
    'Subgerencia de gestión ambiental y servicios municipales',
    'Unidad de medio ambiente y gestión de residuos sólidos',
    'Unidad de fiscalización',
    'Oficina de registro y estado civil',
    'Secretaría técnica de seguridad ciudadana y defensa civil',
    'Subgerencia, infraestructura y desarrollo urbano rural',
    'Unidad de obras públicas',
    'Área técnica municipal de los servicios de agua y saneamiento'
  ];

  const typedocOptionArray = [
    'Solicitud',
    'Oficio',
    'Memorándum',
    'Cartas',
    'Costos',
    'Programa vaso de leche',
    'Informes',
    'Requerimientos',
    'Planillas',
    'Cobro estipulado',
    'Recibo de ingresos',
    'Órdenes',
    'Planos',
    'Manera de pago',
    'Ordenanza',
    'Declaraciones juradas',
    'Conformidades',
    'Resoluciones',
    'Comprobantes de pago',
    'Resoluciones de alcaldía',
    'Ordenanzas municipales'
  ];

  return (
    <>
      <div className="flex items-center justify-center p-10">
        <div className="mx-auto w-full max-w-[800px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 grid-rows-7 content-start mt-3">
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
                optionArray={officeOptionArray}
                label="Oficina*:"
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
                label="Destinatario:"
                name="destinatario"
                display={"flex"}
                type={"name"}
                placeholder={"Nombre Completo"}
                register={register}
              />
              <Input
                label="Archivo*:"
                name="archivo"
                display={"flex"}
                type={"file"}
                placeholder={"Archivo"}
                register={register}
                required
              />
              <Input
                label="Solicitante:"
                name="solicitante"
                display={"flex"}
                type={"name"}
                placeholder={"Nombre Completo"}
                register={register}
              />
              <div className="row-start-5 row-end-6">
                <Input
                  label="Asunto:"
                  name="asunto"
                  display={"flex"}
                  type={"name"}
                  placeholder={"Asunto"}
                  register={register}
                />
              </div>
              <div className="flex justify-around col-start-2 col-end-3 row-start-5 row-end-6">
                <div className="w-2/5">
                  <Button color="blue" text="Limpiar" type="reset" />
                </div>
                <div className="w-2/5">
                  <Button color="green" text="Guardar Cambios" type="submit" />
                </div>
              </div>
            </div>
            <div className='w-full flex'>
              <Link href={id ? `/preview?id=${id}` : `/`} className='w-3/5 mx-auto'>
                <Button color="red" text="Cancelar" />
              </Link>
            </div>
            <div className="flex h-12 mt-3 items-center">
              <div className="flex mr-5 -mb-24 w-full">
                <p>(*) Estos campos son obligatorios</p>
              </div>
            </div>
          </form>
        </div>
      </div>
      {url && (
        <Link href={`${url}`} target="_blank">
          <Button text={"Ver Documento anterior"} color={"blue"} />
        </Link>
      )}
    </>
  );
};

export default Form;

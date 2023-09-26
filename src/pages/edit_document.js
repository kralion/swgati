import BackgroundBasic from "@components/BackgroundBasic";
import Form from "@components/Form";
import Alert from "@components/alerts";
import { storage } from "@libs/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const officeOptionArray = [
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

const EditDocumentPage = () => {
  const id = useRouter().query.id;
  const [url, setUrl] = useState("");

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: async () => {
      const res = await fetch(`/api/document/${id}`);
      const data = await res.json();
      setUrl(data.url);

      if (!officeOptionArray.includes(data.oficina)) {
        data.otraOficina = data.oficina;
        data.oficina = "otra";
      }

      if (!typedocOptionArray.includes(data.tipoDoc)) {
        data.otroDocumento = data.tipoDoc;
        data.tipoDoc = "otra";
      }

      return data;
    },
  });

  const [visible, setVisible] = useState(false);
  let [typeAlert, setTypeAlert] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTypeAlert("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [visible]);

  const onSubmit = (data) => {
    postData(data);
  };

  const postData = async (dataForm) => {
    try {
      dataForm.oficina =
        dataForm.oficina == "otra" ? dataForm.otraOficina : dataForm.oficina;

      dataForm.tipoDoc =
        dataForm.tipoDoc == "otra" ? dataForm.otroDocumento : dataForm.tipoDoc;

      const file = dataForm.archivo[0];

      delete dataForm.otraOficina;
      delete dataForm.otroDocumento;
      delete dataForm.archivo;

      /* dataForm.oficina != 'otra'
        ? (oficina = dataForm.oficina)
        : (oficina = dataForm.otraOficina);
      dataForm.tipoDoc != 'otra'
        ? (tipoDoc = dataForm.tipoDoc)
        : (tipoDoc = dataForm.otroDocumento); */
      const fecha = Date.now().toString();

      const storageRef = ref(
        storage,

        `file/${dataForm.oficina}/${dataForm.tipoDoc}/${fecha}${file.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          message.error(error.message);
          setTypeAlert("alert");
          setVisible(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            dataForm.url = url;

            const res = await fetch(`/api/document/${id}`, {
              method: "PATCH",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify(dataForm),
            });

            const data = await res.json();

            if (data) {
              setTypeAlert("successful");
            } else {
              setTypeAlert("alert");
            }
            setVisible(true);
          });
        }
      );
    } catch (error) {
      console.log(error);
      setTypeAlert("alert");
      setVisible(true);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center place-content-center  min-w-full min-h-screen">
        <div className="flex flex-col space-y-4 mt-28">
          <BackgroundBasic text={"Editar Campos"}>
            <Form
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              setValue={setValue}
              watch={watch}
              id={id}
              url={url}
            />
          </BackgroundBasic>
        </div>
      </div>
      <Alert
        type={typeAlert}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        visible={visible}
      />
    </div>
  );
};

export default EditDocumentPage;

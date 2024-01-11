import Form from "@components/Form";
import Alert from "@components/alerts";
import BackgroundBasic from "@components/BackgroundBasic";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@libs/firebase";
import "animate.css";
// import { adminAuth } from '@libs/firebaseAdmin';
// import nookies from 'nookies';

// export async function getServerSideProps(context) {
//   try {
//     const cookies = nookies.get(context);
//     const token = await adminAuth.verifyIdToken(cookies.token);

//     return {
//       props: { token }
//     };
//   } catch (error) {
//     context.res.writeHead(302, { Location: '/' }).end();
//     return { props: {} };
//   }
// }

const SaveDocumentPage = () => {
  const { register, handleSubmit, setValue, watch } = useForm();

  const [visible, setVisible] = useState(false);
  let [typeAlert, setTypeAlert] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
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

      /*  dataForm.oficina != 'otra'
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

            const res = await fetch("/api/document", {
              method: "POST",
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
      <div className="flex flex-col items-center  h-screen">
        <div className="flex w-2/3 flex-col ">
          <BackgroundBasic text={"Formulario de Registro del Activo TI"}>
            <Form
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              setValue={setValue}
              watch={watch}
            />
          </BackgroundBasic>
        </div>
      </div>
      <Alert
        type={typeAlert}
        className="bg-celeste hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        visible={visible}
      />
    </div>
  );
};

export default SaveDocumentPage;

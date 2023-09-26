import BackgroundBasic from "@components/BackgroundBasic";
import Button from "@components/Button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const PreviewPage = () => {
  const [data, setData] = useState(null);
  const id = useRouter().query.id;

  const getData = async () => {
    const res = await fetch(`/api/document/${id}`);
    const dataGet = await res.json();
    setData(dataGet);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="flex justify-center items-center flex-1 h-full">
      <BackgroundBasic text={"vista previa"}>
        <div className="flex w-full p-2 justify-around">
          <div className="w-3/5 m-4 h-96 border-2 border-black">
            {data && (
              <iframe src={data.url} width="100%" height="100%"></iframe>
            )}
          </div>
          <div className="flex w-1/5 flex-col justify-around p-4">
            {id && (
              <Link href={`/edit_document?id=${id}`}>
                <Button text={"Editar Campos"} color={"blue"} />
              </Link>
            )}
            {data && (
              <Link href={data.url} target="_blank">
                <Button text={"Ver Documento"} color={"blue"} />
              </Link>
            )}
            <Link href={"/search"}>
              <Button text={"Cerrar"} color={"red"} />
            </Link>
          </div>
        </div>
      </BackgroundBasic>
    </main>
  );
};

export default PreviewPage;

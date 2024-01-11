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
    <main className="flex justify-center items-start flex-1 h-screen">
      <BackgroundBasic text={"vista previa"}>
        <div className="m-4 lg:h-[500px] lg:w-[500px] border-2  rounded-xl">
          {data && <iframe src={data.url} width="100%" height="100%"></iframe>}
        </div>
        <div className="flex gap-4 justify-end mx-4 ">
          {id && (
            <Link href={`/edit_document?id=${id}`}>
              <Button text={"Editar"} color="edit" />
            </Link>
          )}
          {data && (
            <Link href={data.url} target="_blank">
              <Button text={"Ver Más"} color="success" />
            </Link>
          )}
          <Link href={"/search"}>
            <Button text={"Cerrar"} color="delete" />
          </Link>
        </div>
      </BackgroundBasic>
    </main>
  );
};

export default PreviewPage;

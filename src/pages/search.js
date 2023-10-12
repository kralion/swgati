import BackgroundBasic from "@components/BackgroundBasic";
import Button from "@components/Button";
import FormS from "@components/Form/FormSearch";
import { Table } from "@components/Table";
import "animate.css";
import { ArrowLeft, ArrowRight, FolderSearch2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const SearchPage = () => {
  const { register, handleSubmit, setValue, watch, getValues } = useForm();
  const router = useRouter();
  const [limit, setLimit] = useState(5);
  const [falseLimit, setFalseLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [abierta, setAbierta] = useState(true);
  const [pabierta, setPAbierta] = useState(true);
  const [changeLimit, setChangeLimit] = useState(false);
  const [falseAbierta, setFalseAbierta] = useState(true);
  const [dataTable, setDataTable] = useState([]);
  const styleth = "font-sans text-sm font-normal px-5 py-2 border-none";

  const onSubmit = (data) => {
    getData(data, false, true);
  };

  const toggleAbierta = () => {
    setFalseAbierta(!falseAbierta);
  };

  const nextPage = () => {
    router.push(`/search?page=${page + 1}`, undefined, { shallow: true });
    setPage(() => page + 1);
  };

  const beforePage = () => {
    if (page === 1) return;

    router.push(`/search?page=${page - 1}`, undefined, { shallow: true });
    setPage(() => page - 1);
  };

  const getData = async (dataForm, changeOrderOrLimit, newSearch) => {
    console.log(changeOrderOrLimit, newSearch);
    if (changeOrderOrLimit === newSearch) return;
    else if (!changeOrderOrLimit === newSearch) setPAbierta(newSearch);

    if (changeLimit || newSearch) {
      setPage(() => 1);
      router.push(`/search?page=1`, undefined, { shallow: true });
      setChangeLimit(false);
    }

    try {
      dataForm.oficina =
        dataForm.oficina == "otra" ? dataForm.otraOficina : dataForm.oficina;

      dataForm.tipoDoc =
        dataForm.tipoDoc == "otra" ? dataForm.otroDocumento : dataForm.tipoDoc;

      delete dataForm.otraOficina;
      delete dataForm.otroDocumento;
      dataForm.asunto = dataForm.asunto.trim();
      dataForm.codigo = dataForm.codigo.trim();
      dataForm.solicitante = dataForm.solicitante.trim();
      dataForm.oficina = dataForm.oficina.trim();
      dataForm.tipoDoc = dataForm.tipoDoc.trim();

      const res = await fetch(
        `/api/document?pagina=${page}&limit=${limit}&order=${
          abierta ? "desc" : "asc"
        }&asunto=${dataForm.asunto}&codigo=${dataForm.codigo}&solicitante=${
          dataForm.solicitante
        }&fecha=${dataForm.fecha}&oficina=${dataForm.oficina}&tipoDoc=${
          dataForm.tipoDoc
        }&${
          dataTable.length && !newSearch && !changeOrderOrLimit
            ? `last=${dataTable[dataTable.length - 1]?.id}`
            : ""
        }`
      );

      const dataGet = await res.json();
      setDataTable(() => {
        if (newSearch || changeOrderOrLimit) return dataGet;

        return [...dataTable, ...dataGet];
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page * limit > dataTable.length) getData(getValues(), changeLimit);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  useEffect(() => {
    getData(getValues(), true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abierta]);

  return (
    <div className=" flex flex-col ">
      <BackgroundBasic text={"Búsqueda de Activos TI"}>
        <FormS
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          setValue={setValue}
          watch={watch}
        />
      </BackgroundBasic>
      <BackgroundBasic text={"Resultados"}>
        <div className="justify-center  space-y-5 ">
          <div className="flex h-10">
            <div className=" flex h-10 w-full flex-row-reverse overflow-clip rounded-lg">
              <input
                className="peer text-center rounded-r-lg border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:outline-none"
                type="number"
                name="limit"
                id="limit"
                placeholder=" N° Resultados "
                value={falseLimit}
                onChange={(e) => {
                  setFalseLimit(e.target.value);
                }}
              />
              <label
                className="flex  bg-gray-200 justify-center items-center  rounded-l-lg  px-2 text-sm transition-colors duration-300 peer-focus:border-[#2BCD32] peer-focus:bg-verde peer-focus:text-white"
                htmlFor="limit"
              >
                Se muestran los 5 primeros resultados
              </label>
            </div>
            <Button
              color="success"
              onClick={() => {
                if (falseAbierta !== abierta) setDataTable([]);
                setLimit(falseLimit);
                setAbierta(falseAbierta);
              }}
              text="Aplicar"
            />
          </div>

          {!dataTable.length ? (
            <p className="text-center">
              <h3>No hay datos de esta búsqueda</h3>
            </p>
          ) : dataTable.length &&
            dataTable.slice((page - 1) * limit, page * limit).length === 0 ? (
            <div className="text-rojo text-sm font-bold ">
              No hay mas coincidencias con esa búsqueda
            </div>
          ) : (
            <Table>
              {dataTable.slice((page - 1) * limit, page * limit).map((data) => (
                <tr className=" odd:bg-gray-400/20 h-16" key={data.id}>
                  <th className={styleth}>{data?.codigo}</th>
                  <th className={`${styleth} text-left`}>{data.oficina}</th>
                  <th className={styleth}>{data.fecha}</th>
                  <th className={styleth}>{data.tipoDoc}</th>
                  <th>
                    <Link
                      className="flex hover:text-green-700 font-normal gap-2 text-sm items-center"
                      href={`/preview?id=${data.id}`}
                    >
                      <FolderSearch2 className="cursor-pointer" size={14} />
                      Preview
                    </Link>
                  </th>
                </tr>
              ))}
            </Table>
          )}
          <br />
          <div className="space-x-1">
            <button
              onClick={() => {
                beforePage();
              }}
              title="Anterior"
              className="bg-green-100 border-1  border-green-500 text-green-500 hover:bg-green-200 rounded-full px-3 py-1"
            >
              <ArrowLeft size={15} />
            </button>

            <button
              onClick={() => {
                nextPage();
              }}
              title="Siguiente"
              className="bg-green-100 border-1  border-green-500 text-green-500 hover:bg-green-200 rounded-full px-3 py-1"
            >
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </BackgroundBasic>
    </div>
  );
};

export default SearchPage;

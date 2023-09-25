import BackgroundBasic from "@components/BackgroundBasic";
import { Table } from "@components/Table";
import FormS from "@components/Form/FormSearch";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Head from "next/head";

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
    <>
      <Head>
        <title>Buscar Documento</title>
        <meta name="description" content="Generado en react" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center place-content-center  min-w-full min-h-screen">
        <div className="flex flex-col space-y-4 mt-28">
          <BackgroundBasic text={"Búsqueda"}>
            <FormS
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              setValue={setValue}
              watch={watch}
            />
          </BackgroundBasic>
          <BackgroundBasic text={"Resultados"}>
            <div className="justify-center my-8 mx-4 ">
              <div className="flex w-f h-10">
                <div className="relative flex h-10 w-full flex-row-reverse overflow-clip rounded-lg">
                  <input
                    className="peer w-1/4 text-center rounded-r-lg border border-slate-400 px-2 text-slate-900 placeholder-slate-400 transition-colors duration-300 focus:border-sky-400 focus:outline-none"
                    type="number"
                    name="limit"
                    id="limit"
                    placeholder="Número de resultados"
                    value={falseLimit}
                    onChange={(e) => {
                      setFalseLimit(e.target.value);
                    }}
                  />
                  <label
                    className="flex w-3/4 bg-[#0B600F] justify-center items-center text-white rounded-l-lg border border-slate-400 px-2 text-sm transition-colors duration-300 peer-focus:border-[#2BCD32] peer-focus:bg-[#2BCD32] peer-focus:text-white"
                    htmlFor="limit"
                  >
                    Cantidad de resultados por consulta (por defecto 5)
                  </label>
                </div>
                <button
                  className="bg-[#0B600F] ml-3 border border-gray-300 text-white font-bold hover:bg-[#2BCD32] rounded-l-lg rounded-r-lg leading-tight py-2 px-3"
                  onClick={() => {
                    if (limit !== falseLimit) setChangeLimit(true);
                    setLimit(falseLimit);
                    setAbierta(falseAbierta);
                  }}
                >
                  Aplicar
                </button>
              </div>
              <div
                className="mb-4 flex items-center cursor-pointer"
                onClick={toggleAbierta}
              >
                <span
                  className={`transform text-[#0B600F] ml-1 mr-2 transition-all duration-500 ${
                    falseAbierta ? "rotate-180" : ""
                  }`}
                >
                  &#9660;
                </span>
                {falseAbierta ? (
                  <p className="text-[#0B600F] font-semibold">Ascendente</p>
                ) : (
                  <p className="text-[#0B600F] font-semibold">Descendente</p>
                )}
              </div>

              {!dataTable.length ? (
                <p className="text-center">NO hay datos de esta búsqueda</p>
              ) : dataTable.length &&
                dataTable.slice((page - 1) * limit, page * limit).length ===
                  0 ? (
                <p>NO hay más resultados de esta búsqueda</p>
              ) : (
                <Table>
                  {dataTable
                    .slice((page - 1) * limit, page * limit)
                    .map((data) => (
                      <tr
                        className="even:bg-gray-100 odd:bg-[#a0c08b] border-none"
                        key={data.id}
                      >
                        <th className={styleth}>{data?.codigo}</th>
                        <th className={styleth}>{data.oficina}</th>
                        <th className={styleth}>{data.fecha}</th>
                        <th className={styleth}>{data.tipoDoc}</th>
                        <th className={styleth}>
                          <Link
                            className="p-2 text-green-800"
                            href={`/preview?id=${data.id}`}
                          >
                            Vista previa 🔍
                          </Link>
                        </th>
                      </tr>
                    ))}
                </Table>
              )}
              <br />
              <div className="max-w-2xl">
                <ul className="inline-flex -space-x-px">
                  <li>
                    <button
                      onClick={() => {
                        beforePage();
                      }}
                      className="bg-[#0B600F] border border-gray-300 text-white hover:bg-[#2BCD32] ml-0 rounded-l-lg leading-tight py-2 px-3"
                    >
                      Anterior
                    </button>
                  </li>
                  <p className="bg-[#0B600F] border border-gray-300 text-white hover:bg-[#2BCD32] rounded-lg leading-tight py-2 px-3">
                    {page}
                  </p>
                  <li>
                    <button
                      onClick={() => {
                        nextPage();
                        // return setPage(page + 1);
                      }}
                      className="bg-[#0B600F] border border-gray-300 text-white hover:bg-[#2BCD32] rounded-r-lg leading-tight py-2 px-3"
                    >
                      Siguiente
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </BackgroundBasic>
        </div>
      </div>
    </>
  );
};

export default SearchPage;

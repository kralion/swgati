import BackgroundBasic from '@components/BackgroundBasic';
import { Table } from '@components/Table';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';

const HomePage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [falseLimit, setFalseLimit] = useState(5);
  const [dataTable, setDataTable] = useState([]);
  const [abierta, setAbierta] = useState(true);
  const [falseAbierta, setFalseAbierta] = useState(true);
  const styleth = 'font-sans text-sm font-normal px-5 py-2 border-none';

  const getData = async () => {
    const res = await fetch(
      `/api/document?pagina=${page}&order=${
        abierta ? 'desc' : 'asc'
      }&point=home&limit=${limit}&${
        dataTable.length ? `last=${dataTable[dataTable.length - 1]?.id}` : ''
      }`
    );
    const dataGet = await res.json();
    setDataTable(() => {
      return [...dataTable, ...dataGet];
    });
  };

  const toggleAbierta = () => {
    setFalseAbierta(!falseAbierta);
  };

  const nextPage = () => {
    router.push(`/?page=${page + 1}`, undefined, { shallow: true });
    setPage(() => page + 1);
  };

  const beforePage = () => {
    if (page === 1) return;

    router.push(`/?page=${page - 1}`, undefined, { shallow: true });
    setPage(() => page - 1);
  };

  useEffect(() => {
    if (page * limit > dataTable.length) getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abierta]);

  return (
    <>
      <Head>
        <title>Sistema de Archivos - MDP</title>
        <meta name="description" content="Generado en react" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center place-content-center bg-white min-w-full min-h-screen">
        <div className="flex flex-col space-y-4">
          <BackgroundBasic text={"Documentos recientes"}>
            <div className="justify-center my-8 mx-4">
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
                    if (falseAbierta !== abierta) setDataTable([]);
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
              <br />
              {/* <div>
                <label htmlFor="">
                  Cantidad ded resultados por consulta (por defecto 5)
                </label>
                <input
                  className="w-80 text-center"
                  type="number"
                  placeholder="Ingresa el número de resultados"
                  value={falseLimit}
                  onChange={(e) => {
                    setFalseLimit(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    if (falseAbierta !== abierta) setDataTable([]);
                    setLimit(falseLimit);
                    setAbierta(falseAbierta);
                  }}
                >
                  Aplicar
                </button>
              </div> */}
              {/* <button
                onClick={() => {
                  beforePage();
                }}
              >
                Anterior
              </button>
              <button
                onClick={() => {
                  nextPage();
                  // return setPage(page + 1);
                }}
              >
                Siguiente
              </button> */}
              {/* <div
                className="flex items-center cursor-pointer"
                onClick={toggleAbierta}
              >
                <span
                  className={`transform transition-all duration-500 ${
                    falseAbierta ? "rotate-180" : ""
                  }`}
                >
                  &#9660;
                </span>
              </div> */}
              <div className="max-w-2xl mx-auto">
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
                  <li>
                    <button
                      onClick={() => {
                        nextPage();
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

export default HomePage;

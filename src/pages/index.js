import BackgroundBasic from "@components/BackgroundBasic";
import Button from "@components/Button";
import { Table } from "@components/Table";
import "animate.css";
import { ArrowLeft, ArrowRight, FolderSearch2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const HomePage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [falseLimit, setFalseLimit] = useState(5);
  const [dataTable, setDataTable] = useState([]);
  const [abierta, setAbierta] = useState(true);
  const [falseAbierta, setFalseAbierta] = useState(true);
  const styleth = "font-sans text-sm font-normal px-5 py-2 border-none";

  const getData = async () => {
    const res = await fetch(
      `/api/document?pagina=${page}&order=${
        abierta ? "desc" : "asc"
      }&point=home&limit=${limit}&${
        dataTable.length ? `last=${dataTable[dataTable.length - 1]?.id}` : ""
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
    <div className="h-screen">
      <BackgroundBasic text={"Registros Recientes"}>
        <div className="space-y-7">
          <div className="flex  h-10">
            <div className="relative flex h-10 w-full flex-row-reverse overflow-clip rounded-lg">
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

          <Table>
            {dataTable.slice((page - 1) * limit, page * limit).map((data) => (
              <tr className=" odd:bg-zinc-100 h-16" key={data.id}>
                <th className={styleth}>{data?.codigo}</th>
                <th className="text-left font-normal">{data.oficina}</th>
                <th className={styleth}>{data.fecha}</th>
                <th className={styleth}>
                  <span
                    className={
                      data.tipoDoc === "Factura de Compra"
                        ? "bg-orange-200 text-orange-500 rounded-xl px-2 py-1"
                        : data.tipoDoc === "Contrato de Compra"
                        ? "bg-green-200 text-green-500 rounded-xl px-2 py-1"
                        : data.tipoDoc === "Orden de Compra"
                        ? "bg-yellow-200 text-yellow-500 rounded-xl px-2 py-1"
                        : data.tipoDoc === "Contrato de Mantenimiento"
                        ? "bg-purple-200 text-purple-500 rounded-xl px-2 py-1"
                        : "bg-gray-200 text-gray-500 rounded-xl px-2 py-1"
                    }
                  >
                    {data.tipoDoc}
                  </span>
                </th>
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
          <div className="space-x-1">
            <button
              onClick={() => {
                beforePage();
              }}
              title="Anterior"
              className="bg-green-300 border-1  border-green-500 text-green-500 hover:opacity-80 rounded-full px-3 py-1"
            >
              <ArrowLeft size={15} />
            </button>

            <button
              onClick={() => {
                nextPage();
              }}
              title="Siguiente"
              className="bg-green-300 border-1  border-green-500 text-green-500 hover:opacity-80 rounded-full px-3 py-1"
            >
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </BackgroundBasic>
    </div>
  );
};

export default HomePage;

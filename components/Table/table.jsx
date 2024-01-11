const headtTexts = ["N°", "ACTIVO", "FECHA ADQUISICION", "CONTRATO", "ACCIÓN"];
const Table = ({ children }) => {
  //const { children } = props;
  return (
    <>
      <table className=" w-full border-collapse border border-green-500 border-none">
        <thead>
          <tr className=" bg-green-800 text-white">
            {headtTexts.map((head, index) => (
              <th
                key={index}
                className="font-sans text-sm  font-bold px-8 py-2 "
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </>
  );
};

export default Table;

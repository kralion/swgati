const Table = ( {children}) => {
  //const { children } = props;
  return (
    <>
      <table className="w-full border-collapse border border-green-500 border-none">
        <thead>
          <tr className="border-none bg-green-800 text-white">
            <th className="font-sans text-sm font-bold px-8 py-2 border-none">
              N°
            </th>
            <th className="font-sans text-sm font-bold px-8 py-2 border-none">
              OFICINA
            </th>
            <th className="font-sans text-sm font-bold px-8 py-2 border-none">
              AÑO
            </th>
            <th className="font-sans text-sm font-bold px-8 py-2 border-none">
              TIPO DOCUMENTO
            </th>
            <th className="font-sans text-sm font-bold px-8 py-2 border-none">
              OPCION
            </th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </>
  );
};

export default Table;

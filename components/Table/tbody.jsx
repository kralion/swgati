import Link from "next/link";

const Tbody = ({ num, office, year, docType, key, preview = "" }) => {
  //const { num, office, year, docType, key, preview = "" } = props;
  return (
    <tr key={key} className="even:bg-gray-100 odd:bg-[#a0c08b] border-none">
      <th className="font-sans text-sm font-normal px-8 py-2 border-none">
        {num}
      </th>
      <th className="font-sans text-sm font-normal px-8 py-2 border-none">
        {office}
      </th>
      <th className="font-sans text-sm font-normal px-8 py-2 border-none">
        {year}
      </th>
      <th className="font-sans text-sm font-normal px-8 py-2 border-none">
        {docType}
      </th>
      <th className="font-sans text-sm font-normal px-8 py-2 border-none">
        <Link className="p-2 text-green-800" href={preview}>
          Vista previa 🔍
        </Link>
      </th>
    </tr>
  );
};

export default Tbody;

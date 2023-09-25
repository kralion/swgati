import { useEffect, useState } from "react";
import Input from "@components/Input";

const InputOption = ({
  optionArray,
  otheroption,
  photheroption,
  register,
  name,
  label,
  setValue,
  watch,
}) => {
  optionArray.sort((a, b) => a.localeCompare(b));

  const selectedOption = watch(name);

  useEffect(() => {
    if (selectedOption != "otra") {
      setValue(otheroption, "");
    }
  }, [selectedOption]);

  return (
    <>
      <div className="flex items-center m-3 ">
        <label
          htmlFor={`${name}`}
          className={`flex items-center px-2 text-sm font-medium text-gray-600 w-28 max-h-8 mr-3`}
        >
          {label}
        </label>
        <div className="flex items-center gap-2">
          <select
            {...register(name)}
            className=" border-1 border-verde text-verde text-sm  rounded-m  w-full p-2.5  max-h-14 rounded-lg"
          >
            {optionArray.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
            <option value="otra">Otro:</option>
          </select>

          <input
            className={`${
              watch(name) != "otra" && "hidden"
            }  border-1   text-verde border-verde  rounded-m w-full p-2.5 text-sm rounded-lg my-5`}
            type="text"
            {...register(otheroption)}
            placeholder={photheroption}
            onChange={(e) => setValue(name, "otra")}
          />
        </div>
      </div>
    </>
  );
};

export default InputOption;

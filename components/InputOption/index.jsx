import { useEffect, useState } from "react";
import Input from "@components/Input";

const InputOption = ({ optionArray, otheroption, photheroption, register, name, label, setValue, watch }) => {
  optionArray.sort((a, b) => a.localeCompare(b));

  const selectedOption = watch(name)

  useEffect( () => {
    if(selectedOption != "otra") {
      setValue(otheroption, "")
    }
  },[selectedOption])
  
  
  return (
    <>
      <div className="flex items-center m-3 max-w-md">
        <label
          htmlFor={`${name}`}
          className={`flex items-center px-2 text-sm font-medium text-gray-600 w-28 max-h-8 mr-3`}
        >
          {label}
        </label>
        <div className="flex flex-col">
          <select
            {...register(name)}
            className="bg-gray-300 border border-gray-400 text-gray-800 text-sm rounded-m block w-60 p-2.5  max-h-14 rounded"
          >
            {optionArray.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
            <option value="otra">Otro:</option>
          </select>
          
          <input
            className={`${watch(name) != "otra" && "hidden"} bg-gray-300 border border-gray-400 text-gray-800 text-sm rounded-m block w-60 p-2.5 max-h-14 rounded`}
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

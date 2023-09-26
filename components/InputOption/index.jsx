import { useEffect } from "react";

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
      <div className="space-y-2  ">
        <label htmlFor={`${name}`} className={`text-sm `}>
          {label}
        </label>
        <div className="flex items-center gap-2">
          <select
            {...register(name)}
            className=" border-1 border-verde text-verde text-sm w-full    p-2.5   rounded-lg"
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

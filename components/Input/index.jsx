const Input = ({
  display,
  type,
  label,
  register,
  required,
  placeholder,
  name,
}) => {
  let typedisplay;
  let margin = "";
  let padding = "";

  switch (display) {
    case "inline":
      typedisplay = "block";
      margin = "mb-2";
      break;
    case "flex":
      typedisplay = "flex items-center";
      padding = "px-2";
      break;
    default:
      break;
  }

  return (
    <div className={`${typedisplay} mt-7 space-y-3 `}>
      <label
        htmlFor={`${name}`}
        className={`${typedisplay} ${margin} ${padding}  text-sm pl-2`}
      >
        {label}
      </label>
      <input
        {...register(name)}
        type={`${type}`}
        id={`${name}`}
        className="bg-white px-5 py-3 shadow-lg text-[#006270] text-sm rounded-full block w-full p-2.5  "
        placeholder={`${placeholder}`}
        required={required}
        // {...props}
      />
    </div>
  );
};

export default Input;

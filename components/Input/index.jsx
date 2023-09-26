const Input = ({
  display,
  type,
  label,
  register,
  required,
  placeholder,
  name,
}) => {
  return (
    <div className="space-y-2 ">
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        id={name}
        className="bg-white  border-1 border-verde text-verde text-sm rounded-lg block w-full p-3 "
        placeholder={placeholder}
        required={required}
        // {...props}
      />
    </div>
  );
};

export default Input;

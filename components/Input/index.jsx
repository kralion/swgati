const Input = ({
  display,
  type,
  label,
  register,
  required,
  placeholder,
  name
}) => {
  let typedisplay;
  let margin = '';
  let padding = '';

  switch (display) {
    case 'inline':
      typedisplay = 'block';
      margin = 'mb-2';
      break;
    case 'flex':
      typedisplay = 'flex items-center';
      padding = 'px-2';
      break;
    default:
      break;
  }

  return (
    <div className={`${typedisplay} m-3 max-w-md`}>
      <label
        htmlFor={`${name}`}
        className={`${typedisplay} ${margin} ${padding}  text-sm font-medium text-gray-600 w-28 max-h-8 mr-3`}
      >
        {label}
      </label>
      <input
        {...register(name)}
        type={`${type}`}
        id={`${name}`}
        className='bg-gray-300 border border-gray-400 text-gray-800 text-sm rounded-m block w-60 p-2.5  max-h-14 rounded'
        placeholder={`${placeholder}`}
        required={required}
        // {...props}
      />
    </div>
  );
};

export default Input;

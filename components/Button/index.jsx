const colores = {
  edit: "bg-green-500 text-white border-2 border-green-400  hover:opacity-80 ",
  delete: "bg-rojo hover:opacity-80 border-2 border-red-400 text-white",
  success: "bg-verde hover:opacity-80 border-green-600/50 border-2  text-white",
};

const Button = (props) => {
  const { color, text } = props;
  return (
    <button
      {...props}
      className={`${colores[color]} w-fit duration-300  text-sm py-3 px-6  rounded-full  `}
    >
      {text}
    </button>
  );
};

export default Button;

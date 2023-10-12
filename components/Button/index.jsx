const colores = {
  edit: "border-2 border-green-500 text-green-500 rounded-lg hover:bg-green-500  hover:text-white hover:border-green-500 ",
  delete: "bg-rojo hover:opacity-80 text-white",
  success: "bg-verde hover:opacity-80 text-white",
};

const Button = (props) => {
  const { color, text } = props;
  return (
    <button
      {...props}
      className={`${colores[color]} w-fit     duration-300  text-sm py-3 px-6  rounded-lg  `}
    >
      {text}
    </button>
  );
};

export default Button;

const colores = {
  green: "bg-verde hover:bg-green-700",
  red: "bg-rojo hover:bg-red-700",
  blue: "bg-celeste hover:bg-blue-500",
};

const Button = (props) => {
  const { color, text } = props;
  return (
    <button
      {...props}
      className={`${colores[color]}   hover:shadow-2xl  text-white duration-300  text-sm p-3 rounded-lg  w-full`}
    >
      {text}
    </button>
  );
};

export default Button;

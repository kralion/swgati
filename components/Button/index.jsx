const colores = {
  green: "bg-verder hover:bg-green-700",
  red: "bg-red hover:bg-red-700",
  blue: "bg-celeste hover:bg-blue-500",
};

const Button = (props) => {
  const { color, text } = props;
  return (
    <button
      {...props}
      className={`${colores[color]}  border-2 hover:shadow-md focus:shadow-outline  text-white duration-300  text-sm p-3 rounded-lg  w-full`}
    >
      {text}
    </button>
  );
};

export default Button;

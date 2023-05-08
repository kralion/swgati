const colores = {
  green: 'bg-[#0B600F] hover:bg-[#2BCD32]',
  red: 'bg-[#831e1e] hover:bg-[#D32F2F]',
  blue: 'bg-[#2CA6C0] hover:bg-[#3fdcff]'
};

const Button = (props) => {
  const { color, text } = props;
  return (
    <button
      {...props}
      className={`${colores[color]} block  my-3 shadow focus:shadow-outline focus:outline-none text-white text-sm py-3 px-5 rounded w-full mx-auto`}
    >
      {text}
    </button>
  );
};

export default Button;

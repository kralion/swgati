export default function Title(props) {
  const { tFont, color, text } = props;
  let tyFont, colorl;

  switch (tFont) {
    case "small":
      tyFont = "font-normal text-sm";
      break;
    case "medium":
      tyFont = "font-semibold text-lg";
      break;
    case "large":
      tyFont = "font-extrabold text-2xl";
      break;
  }

  switch (color) {
    case "black":
      colorl = "text-black";
      break;
    case "white":
      colorl = "text-white";
      break;
  }

  return (
    <div className={`${tyFont} ${colorl}`} {...props}>
      {text}
      <hr className="border-1 border-verde mt-2 mb-10" />
    </div>
  );
}

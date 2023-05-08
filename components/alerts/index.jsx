const Alert =  ( props ) => {

const {  type, visible } = props
let backgroundColor;
let defaultText;
switch (type) {
  case "successful":
    backgroundColor = "bg-green-500";
    defaultText = "Documento guardado exitosamente";
    break;
  case "alert":
    backgroundColor = "bg-red-500";
    defaultText = "No se pudo guardar - Error";
    break;
}

return (
  <>
    <div className="absolute bottom-0 right-0 pr-10 h-100">
      <div className="block w-full">
        <div
          className={`${backgroundColor} font-regular relative mb-4 block w-full rounded-lg  p-4 text-base leading-5 text-white backdrop-opacity-100`}
          style={{
            // padding: "auto",
            position: "relative",
            bottom: visible ? "10px" : "-40px" ,

            opacity: visible ? 1 : 0,
            transition: "all 0.5s ease-in-out",
          }}
        >
          {defaultText}
        </div>
      </div>
      <div className="w-full md:w-7/12 pt-5 px-4 mb-8 mx-auto text-center" />
    </div>
  </>
);
}
export default Alert;

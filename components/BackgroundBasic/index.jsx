import Title from "@components/Title";
import "animate.css";

const BackgroundBasic = ({ children, text }) => {
  return (
    <section className="animate__animated animate__fadeInUp mt-5 p-5 backdrop-blur-md shadow-2xl rounded-2xl bg-white bg-opacity-20 border-[1px] text-black">
      <Title
        text={text}
        className="text-2xl font-semibold uppercase tracking-tight"
      />

      {children}
    </section>
  );
};

export default BackgroundBasic;

import Title from "@components/Title";
import "animate.css";

const BackgroundBasic = ({ children, text }) => {
  return (
    <section className="animate__animated animate__fadeInUp mt-5 p-5 backdrop-blur-lg rounded-2xl bg-white bg-opacity-5  min-w-64  text-black   ">
      <Title
        text={text}
        className="text-2xl font-semibold uppercase tracking-tight"
      />

      {children}
    </section>
  );
};

export default BackgroundBasic;

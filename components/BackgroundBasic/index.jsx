import Title from "@components/Title";

const BackgroundBasic = ({ children, text }) => {
  return (
    <section className=" px-8 py-6  w-full  ">
      <Title
        text={text}
        className="text-2xl font-semibold uppercase tracking-tight"
      />

      {children}
    </section>
  );
};

export default BackgroundBasic;

import Title from "@components/Title";

const BackgroundBasic = ({ children, text }) => {
  return (
    <section className=" px-8 py-6 min-w-[320px] max-w-[1080px] w-full rounded-md ">
      <Title text={text} className="text-3xl font-semibold capitalize" />

      {children}
    </section>
  );
};

export default BackgroundBasic;

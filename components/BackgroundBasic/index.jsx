import Title from "@components/Title";

const BackgroundBasic = ({ children, text }) => {
  return (
    <section className="bg-[#FEFFD0] text-black px-8 py-6 min-w-[320px] max-w-[1080px] w-full rounded-md shadow-md">
      <div className="bg-[#FFF27E] p-4 rounded-md shadow-md">
        <Title text={text} className="text-3xl font-semibold capitalize" />
      </div>
      {children}
    </section>
  );
};

export default BackgroundBasic;

import Image from "next/image";

const Logo = ({ img, alt }) => (
  <Image className='h-12 w-12 object-cover' src={img} alt={alt} width={100} height={100} />
);

export default Logo;

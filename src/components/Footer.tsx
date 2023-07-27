import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-walterWhite p-5 justify-center flex flex-col items-center mt-1">
      <Image src="/logo.png" alt="full stack week" width={133} height={23} />
      <p className="text-sm font-medium text-primaryDarker lg:text-base lg:mt-2">
        Todos os direitos reservados.
      </p>
    </div>
  );
};

export default Footer;

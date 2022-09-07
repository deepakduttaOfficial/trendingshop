import React from "react";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <>
      <footer className=" bg-dark text-white p-2 fixed-bottom ">
        <a
          href="https://deepakdutta.netlify.app/"
          target={"_blank"}
          className="text-decoration-none"
        >
          <p className="m-auto text-center text-">
            Create By Coder_Deepak ©{date}
          </p>
        </a>
      </footer>
    </>
  );
};

export default Footer;

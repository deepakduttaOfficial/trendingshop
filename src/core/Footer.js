import React from "react";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <>
      <footer className=" bg-dark text-white p-2 fixed-bottom ">
        <p className="m-auto text-center">Create By Coder Deepak ©{date}</p>
      </footer>
    </>
  );
};

export default Footer;

import React from "react";
import Footer from "./Footer";
import Navber from "./Navber";

const Base = ({
  children,
  className = "text-white",
  title = "",
  description = "",
}) => {
  return (
    <>
      <Navber />
      <div className="container-fluid">
        <div className=" text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <div style={{ height: "50px" }}></div>
      <Footer />
    </>
  );
};

export default Base;

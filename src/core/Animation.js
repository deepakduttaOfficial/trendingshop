import React from "react";

export const loadingAnimation = () => {
  return (
    <>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export const errorAnimation = (
  error,
  className = "alert alert-danger container m-auto col-md-7 mb-3"
) => {
  return (
    <div className={className} role="alert">
      {error}
    </div>
  );
};

export const successAnimation = (
  success,
  className = "alert alert-success container m-auto col-md-7 mb-3"
) => {
  return (
    <div className={className} role="alert">
      {success}
    </div>
  );
};

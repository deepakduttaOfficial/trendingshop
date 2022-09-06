import React from "react";

const Geaustaccount = () => {
  return (
    <>
      <div className="container text-center">
        <button
          type="button"
          className="btn btn-primary rounded mb-3"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Click me
        </button>
      </div>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog text-dark">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Log in this admin account
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <b> Admin account</b>: coderdeepak@gmail.com
              <br />
              <b> password</b>: 123
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary rounded"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Geaustaccount;

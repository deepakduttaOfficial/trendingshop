import React, { Fragment } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { isAuthenticate, signout } from "../auth/helper";

const Navber = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item me-3">
                <NavLink className="nav-link " aria-current="page" to="/">
                  Home
                </NavLink>
              </li>

              <li className="nav-item me-3">
                <NavLink className="nav-link" to="/cart">
                  Cart
                </NavLink>
              </li>

              {isAuthenticate() && isAuthenticate().user.role === 1 && (
                <li className="nav-item me-3">
                  <NavLink className="nav-link" to="/admindashboard">
                    A.Dashboard
                  </NavLink>
                </li>
              )}

              {isAuthenticate() && isAuthenticate().user.role === 0 && (
                <li className="nav-item me-3">
                  <NavLink className="nav-link" to="/userdashboard">
                    U.Dashboard
                  </NavLink>
                </li>
              )}

              {!isAuthenticate() && (
                <Fragment>
                  <li className="nav-item me-3">
                    <NavLink className="nav-link" to="/signup">
                      Sign Up
                    </NavLink>
                  </li>
                  <li className="nav-item me-3">
                    <NavLink className="nav-link" replace to="/signin">
                      Sign in
                    </NavLink>
                  </li>
                </Fragment>
              )}

              {isAuthenticate() && (
                <li className="nav-item me-3">
                  <span
                    className="nav-link "
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      signout(() => {
                        navigate("/");
                      });
                    }}
                  >
                    Signout
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navber;

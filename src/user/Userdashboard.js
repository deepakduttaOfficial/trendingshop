import React, { useState, useEffect } from "react";
import { isAuthenticate } from "../auth/helper";
import Base from "../core/Base";
import { getuser } from "./helper/userhelper";

const Userdashboard = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    role: "",
    purchese: [],
  });
  const { name, email, purchese, role } = userInfo;
  const { user, token } = isAuthenticate();

  const getUser = () => {
    getuser(user._id, token).then((data) => {
      if (data.error) {
        console.log(data);
      } else {
        setUserInfo(data);
      }
    });
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <Base title="User Dashboard">
      <h3 className="text-center text-white">Well Come {name}</h3>
      <div className="container ">
        <table className="table table-dark table-striped">
          <tbody>
            <tr>
              <th scope="row">Name</th>
              <td>{name}</td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>{email}</td>
            </tr>
            <tr>
              <th scope="row">Role</th>
              <td colSpan="2">{role}</td>
            </tr>
            <tr>
              <th scope="row">Purchese</th>
              <td colSpan="2">
                {/*  */}
                <table className="table table-dark">
                  <tbody>
                    <tr>
                      <th scope="row">Purchese time</th>
                      <td>{purchese.length}</td>
                    </tr>
                    <tr>
                      <th scope="row">Total amount</th>
                      <td>Null</td>
                    </tr>
                    <tr>
                      <th scope="row">More Functionality</th>
                      <td>Comes few days</td>
                    </tr>
                  </tbody>
                </table>
                {/*  */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Base>
  );
};

export default Userdashboard;

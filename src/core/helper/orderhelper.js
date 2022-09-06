import { API } from "../../backend";

export const createorder = (userId, token, orderdata) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: orderdata }),
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};

export const getallorders = () => {
  return fetch(`${API}/orders`, {
    method: "GET",
  })
    .then((responce) => {
      return responce.json();
    })
    .catch((err) => console.log(err));
};

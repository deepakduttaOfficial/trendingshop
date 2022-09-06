import { API } from "../../backend";
export const stripehelper = (token, products) => {
  return fetch(`${API}/stripe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, products }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

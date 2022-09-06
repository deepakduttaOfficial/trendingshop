import { API } from "../../backend";

const Imagehelper = ({ product }) => {
  let imageUrl = product
    ? `${API}/product/photo/${product._id}`
    : "https://n2.sdlcdn.com/imgs/g/x/0/Wrangler-Yellow-Round-T-Shirt-SDL409481971-1-2c0bd.jpg";
  return (
    <img
      src={imageUrl}
      className="card-img-top"
      alt="Product"
      style={{ width: "12rem", height: "15rem" }}
    />
  );
};

export default Imagehelper;

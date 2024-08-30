import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import axios from "axios";

export default function AddProduct({ serverUrl }) {
  const navigate = useNavigate();

  async function handleSubmit(
    event,
    name,
    description,
    price,
    imgUrl,
    stock,
    categoryId
  ) {
    event.preventDefault();

    try {
      const body = { name, description, price, imgUrl, stock, categoryId };

      const { data } = await axios.post(`${serverUrl}/products`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ProductForm
        serverUrl={serverUrl}
        formTitle="Add New Product"
        buttonText="Add Product"
        handleSubmit={handleSubmit}
      />
    </>
  );
}

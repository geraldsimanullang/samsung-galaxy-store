import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function EditProduct({ serverUrl }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  async function getProduct() {
    try {
      const { data } = await axios.get(`${serverUrl}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setProduct(data.product);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProduct()
  }, [id])

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

      const { data } = await axios.put(`${serverUrl}/products/${id}`, body, {
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
        formTitle="Edit"
        buttonText="Save Changes"
        handleSubmit={handleSubmit}
        product={product}
      />
    </>
  );
}

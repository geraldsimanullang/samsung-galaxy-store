import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../assets/Loading.svg";

export default function Detail() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  async function fetchProduct() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://server.geraldsimanullang.site/pub/products/${id}`
      );

      setProduct(data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [id]);

  function displayPrice(price) {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });

    return formatter.format(price);
  }

  return (
    <>
      <div className="p-2 border-y-2">
        <h1 className="text-black text-3xl text-center">
          Samsung Galaxy Store
        </h1>
      </div>
      <div>
        <Link to="/" className="pl-5 text-black text-xs">
          {"<<"} Back to products
        </Link>
      </div>
      {loading ? (
        <div className="flex flex-col items-center justify-end w-full h-40">
          <img src={Loading} className="h-10" />
          <p>Loading...</p>
        </div>
      ) : (
        <div className="flex pl-10 pt-6">
          <img src={product.imgUrl} alt={product.name} className="max-w-96" />
          <div className="flex flex-col pl-10">
            <h2 className="text-xl text-black font-bold mb-8">
              {product.name}
            </h2>
            <h2 className="text-sm text-black font-bold">Description:</h2>
            <p className="text-sm text-black w-full pr-20 mb-8">
              {product.description}
            </p>
            <h2 className="text-sm text-black font-bold">Price:</h2>
            <p className="text-lg text-orange-500 font-bold">
              {displayPrice(product.price)},-
            </p>
          </div>
        </div>
      )}
    </>
  );
}

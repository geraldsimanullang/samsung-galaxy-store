import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      const { data } = await axios.get(
        "https://server.geraldsimanullang.site/pub/products?page=1"
      );

      setProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <main className="flex flex-wrap bg-white justify-around">
        {products.map((el) => (
          <Card product={el} />
        ))}
      </main>
    </>
  );
}

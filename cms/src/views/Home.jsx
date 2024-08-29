import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      const { data } = await axios.get(
        "https://server.geraldsimanullang.site/products",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      setProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  function displayPrice(price) {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });

    return formatter.format(price);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="overflow-x-auto p-10">
        <table className="table text-black">
          {/* head */}
          <thead className="text-black">
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {products.map((product) => {
              return (
                <>
                  <tr>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={product.imgUrl} alt="" />
                        </div>
                      </div> <br />
                      <div>
                        <Link>Upload</Link>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="max-w-96">{product.description}</p>
                    </td>
                    <td>
                      <p>{displayPrice(product.price)}</p>
                    </td>
                    <td>
                      <p>{product.stock}</p>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

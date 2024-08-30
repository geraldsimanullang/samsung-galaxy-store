import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../assets/Loading.svg";

export default function Home({ serverUrl }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${serverUrl}/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setProducts(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

  const navigate = useNavigate();

  function handleEditButton(event, id) {
    event.preventDefault();

    navigate(`/edit/${id}`);
  }

  async function handleDeleteButton(event, id) {
    try {
      event.preventDefault();

      await axios.delete(
        `https://server.geraldsimanullang.site/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      getProducts();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {loading ? 

          <div className="min-h-screen flex flex-col items-center mt-32 ">
            <img src={Loading} className="size-16"/>
            <p>fetching data...</p>
          </div>
       : 
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {products.slice().reverse().map((el) => {
                return (
                  <>
                    <tr>
                      <td>
                        <div className="avatar flex flex-col items-center">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={el.imgUrl} alt="" />
                          </div>
                          <Link to="" className="text-xs text-blue-600">Edit image</Link>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-bold">{el.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="max-w-96">{el.description}</p>
                      </td>
                      <td>
                        <p>{displayPrice(el.price)}</p>
                      </td>
                      <td>
                        <p>{el.stock}</p>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            className="btn btn-active btn-primary"
                            onClick={(event) => handleEditButton(event, el.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-error"
                            onClick={(event) =>
                              handleDeleteButton(event, el.id)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      }
    </>
  );
}

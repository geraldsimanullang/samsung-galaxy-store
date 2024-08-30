import { useState, useEffect } from "react";
import axios from "axios";

export default function Categories({ serverUrl }) {
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    try {
      const { data } = await axios.get(`${serverUrl}/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="flex flex-col py-16 px-96">
        <h1 className="text-black text-2xl mb-10">Category List</h1>
        <table className="table text-black">
          <thead className="text-black">
            <tr>
              <th className="w-10 text-center">ID</th>
              <th className="w-32 text-center">Category</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => {
              return (
                <>
                  <tr>
                    <td className="text-center">{category.id}</td>
                    <td className="text-center">{category.name}</td>
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

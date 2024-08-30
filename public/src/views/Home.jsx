import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("1,2,3");
  const [sort, setSort] = useState();
  const [page, setPage] = useState(1);

  const categories = [
    {
      id: 1,
      name: "Galaxy S Series",
    },
    {
      id: 2,
      name: "Galaxy Z Series",
    },
    {
      id: 3,
      name: "Galaxy A Series",
    },
  ];

  async function fetchProducts() {
    try {
      const { data } = await axios.get(
        `https://server.geraldsimanullang.site/pub/products?page=${page}&filter[category]=${filter}`
      );
      console.log(data);
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleFilter(event) {
    event.preventDefault();
    const c1 = event.target[0].checked;
    const c2 = event.target[1].checked;
    const c3 = event.target[2].checked;

    if ((c1 && c2 && c3) || (!c1 && !c2 && !c3)) {
      setFilter("1,2,3");
    } else {
      const selections = [];
      if (c1) selections.push(categories[0].id);
      if (c2) selections.push(categories[1].id);
      if (c3) selections.push(categories[2].id);

      const selectionsStr = selections.join(",");
      setFilter(selectionsStr);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [search, filter, sort, page]);

  return (
    <>
      <div className="flex flex-col gap-4 bg-white">
        <div className="bg-orange-50 p-5">
          <h1 className="text-black text-3xl text-center">
            Samsung Galaxy Store
          </h1>
        </div>
        <div className="flex justify-start pl-5">
          <div className="flex flex-col gap-2 w-auto">
            <h2 className="text-black text-sm font-semibold whitespace-nowrap">
              Filter by category
            </h2>
            <form
              className="flex flex-col gap-2"
              onSubmit={(event) => handleFilter(event)}
            >
              {categories.map((category) => {
                return (
                  <div className="flex gap-1 items-center">
                    <input
                      type="checkbox"
                      className="checkbox"
                      value={category.id}
                    />
                    <label className="text-xs text-black whitespace-nowrap">
                      {category.name}
                    </label>
                  </div>
                );
              })}
              <div className="flex justify-start">
                <button
                  type="submit"
                  className="w-16 px-2 py-1 bg-orange-100 font-semibold text-black text-xs rounded-lg shadow-md hover:bg-orange-400"
                >
                  Filter
                </button>
              </div>
            </form>
          </div>
          <main className="flex flex-wrap justify-start px-6 gap-6">
            {products.map((el) => (
              <Card product={el} />
            ))}
          </main>
        </div>
      </div>
    </>
  );
}

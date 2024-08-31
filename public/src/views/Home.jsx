import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../assets/Loading.svg";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("1,2,3");
  const [sort, setSort] = useState("DESC");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalpage] = useState(0);

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
      setLoading(true);
      const { data } = await axios.get(
        `https://server.geraldsimanullang.site/pub/products?search=${search}&filter[category]=${filter}&sort=${sort}&page=${page}`
      );

      setPage(data.currentPage);
      setTotalpage(data.totalPage);
      setProducts(data.data);
      set;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    console.log(event);

    setSearch(event.target[0].value);
  }

  function handleFilter(event) {
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

  function handleSort(event) {
    event.preventDefault();

    if (event.target[1].checked) {
      setSort("ASC")
    } else {
      setSort("DESC")
    }
  }

  function handlePreviousPage(event) {
    event.preventDefault();
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function handleNextPage(event) {
    event.preventDefault();
    if (page < totalPage) {
      setPage(page + 1);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [search, filter, sort, page]);

  return (
    <>
      <div className="flex flex-col gap-2 bg-white">
        <div className="p-2 border-y-2">
          <h1 className="text-black text-3xl text-center">
            Samsung Galaxy Store
          </h1>
        </div>

        <div className="flex justify-start pl-5">
          <div className="flex flex-col gap-3 pt-3 w-auto mr-5">
            <div className="flex flex-col gap-2">
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
            <div className="flex flex-col gap-2 pt-3 w-auto mr-5">
              <h2 className="text-black text-sm font-semibold whitespace-nowrap">
                Sort
              </h2>
              <form
                className="flex flex-col gap-2"
                onSubmit={(event) => handleSort(event)}
              >
                <div className="flex gap-2 items-center bg-white">
                  <input
                    type="radio"
                    name="sort"
                    className="accent-orange-300"
                    value="DESC"
                    defaultChecked
                  />
                  <label className="text-xs text-black">Newest</label>
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="radio"
                    name="sort"
                    className="accent-orange-300"
                    value="ASC"
                  />
                  <label className="text-xs text-black">Oldest</label>
                </div>
                <div className="flex justify-start">
                  <button
                    type="submit"
                    className="w-16 px-2 py-1 bg-orange-100 font-semibold text-black text-xs rounded-lg shadow-md hover:bg-orange-400"
                  >
                    Sort
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex flex-col  w-full justify-start">
            <div className="flex flex-col">
              <div className="flex justify-between items-center w-full pr-32 pl-10">
                <div>
                  <form
                    className="flex gap-2"
                    onSubmit={(event) => handleSearch(event)}
                  >
                    <input
                      type="text"
                      className="w-60 h-8 px-4 py-2 border bg-white text-black text-xs border-gray-300 rounded-lg focus:outline-none"
                      placeholder="Search Samsung Galaxy Phone"
                    />
                    <button
                      type="submit"
                      className="w-16 px-2 py-1 bg-orange-100 font-semibold text-black text-xs rounded-lg shadow-md hover:bg-orange-400"
                    >
                      Search
                    </button>
                  </form>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="btn bg-white text-black border-0 hover:bg-slate-200"
                    onClick={(event) => handlePreviousPage(event)}
                  >
                    «
                  </button>
                  <p className=" bg-white text-black border-0 text-xs">{`Page ${page} / ${totalPage}`}</p>
                  <button
                    className="btn bg-white text-black border-0 hover:bg-slate-200"
                    onClick={(event) => handleNextPage(event)}
                  >
                    »
                  </button>
                </div>
              </div>
              {loading ? (
                <div className="flex flex-col justify-end items-center h-60">
                  <img src={Loading} className="h-10 w-10" />
                  <p>Loading...</p>
                </div>
              ) : (
                <main className="flex flex-wrap justify-start pl-6 px-2 pb-8 pt-2 gap-6 gap-y-8">
                  {products.map((el) => (
                    <Link to={`/${el.id}`}>
                      <Card product={el} />
                    </Link>
                  ))}
                </main>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function ProductForm({
  serverUrl,
  formTitle,
  buttonText,
  handleSubmit,
  product,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [categoryId, setCategoryId] = useState(1);
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

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setImgUrl(product.imgUrl);
      setPrice(product.price);
      setStock(product.stock);
      setCategoryId(product.categoryId);
    }
  }, [product]);

  return (
    <>
      <div className="flex flex-col items-center text-black">
        <h1 className="font-bold text-2xl pt-10">{formTitle} {name}</h1>
        <form
          className="flex flex-col w-2/5 pt-10 gap-1"
          onSubmit={(event) =>
            handleSubmit(
              event,
              name,
              description,
              price,
              imgUrl,
              stock,
              categoryId
            )
          }
        >
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            name="name"
            className="h-8 mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            className=" mb-3 h-28 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="imgUrl">Image URL</label>
          <input
            type="text"
            name="imgUrl"
            className="h-8 mb-3"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />

          <div className="flex flex-wrap justify-between mb-3 w-full">
            <div className="flex flex-col">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                className="h-8 mb-3 w-auto"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                name="stock"
                className="h-8 mb-3 w-36"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id=""
                className="w-auto h-8 text-xs"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            {buttonText}
          </button>
        </form>
      </div>
    </>
  );
}

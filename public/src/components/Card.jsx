import { useNavigate } from "react-router-dom";

export default function Card({ product }) {
  const navigate = useNavigate();

  function displayPrice(price) {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });

    return formatter.format(price);
  }

  function handleSeeDetail(event, id) {
    event.preventDefault();
    navigate(`/${id}`);
  }

  return (
    <div className="card border-y bg-white-100 w-48 h-96 shadow-xl mt-1 mx-2 text-black transform hover:scale-105 transition-transform duration-200">
      <figure>
        <img src={product.imgUrl} alt={product.name} className="p-9 max-h-56" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xs font-normal">{product.name}</h2>
        <p className="font-bold text-sm">{displayPrice(product.price)}</p>
      </div>
      <div className="flex justify-end p-6">
        <button onClick={(event) => handleSeeDetail(event, product.id)}>
          See Detail
        </button>
      </div>
    </div>
  );
}

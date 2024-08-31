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
    <div className="card border-y bg-white-100 w-48 h-auto shadow-lg mt-1 mx-2 text-black transform hover:scale-105 transition-transform duration-200">
      <figure className="h-40">
        <img src={product.imgUrl} alt={product.name} className="p-9 max-h-48" />
      </figure>
      <div className="card-body pt-2 pb-2">
        <h2 className="card-title text-xs font-normal">{product.name}</h2>
        <p className="font-bold text-xs text-green-700">{displayPrice(product.price)}</p>
      </div>
      <div className="flex justify-end pb-6 pr-6 pt-4">
        <button className="text-xs" onClick={(event) => handleSeeDetail(event, product.id)}>
          See Detail
        </button>
      </div>
    </div>
  );
}

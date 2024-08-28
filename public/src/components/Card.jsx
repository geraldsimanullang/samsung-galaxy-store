export default function Card({ product }) {

  function displayPrice(price) {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    })

    return formatter.format(price)
  }

  return (
    <div className="card bg-white-100 max-w-64 shadow-2xl mt-10 mx-5 text-black">
      <figure>
        <img src={product.imgUrl} alt={product.name} className="p-4 max-h-56"/>
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xs font-normal">{product.name}</h2>
        <p className="font-bold text-sm">{displayPrice(product.price)}</p>
      </div>
      <div className="flex justify-end p-6">
        <button>
          See Detail
        </button>
      </div>
    </div>
  );
}

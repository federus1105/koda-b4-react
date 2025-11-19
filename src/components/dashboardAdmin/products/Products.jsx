import React from "react";
import { Calendar } from "lucide-react";

function Products() {
  const dateRange = [
    "16 - 23 January 2023",
    "24 - 31 January 2023",
    "1 - 7 February 2023",
  ];

  const products = [
    {
      no: 1,
      nama: "Caramel Machiato",
      terjual: "300 Cup",
      keuntungan: "IDR 9.000.000",
    },
    {
      no: 2,
      nama: "Hazelnut Latte",
      terjual: "200 Cup",
      keuntungan: "IDR 8.000.000",
    },
    {
      no: 3,
      nama: "Kopi Susu",
      terjual: "100 Cup",
      keuntungan: "IDR 7.000.000",
    },
    {
      no: 4,
      nama: "Espresso Supreme",
      terjual: "90 Cup",
      keuntungan: "IDR 6.000.000",
    },
    {
      no: 5,
      nama: "Caramel Velvet Latte",
      terjual: "80 Cup",
      keuntungan: "IDR 5.000.000",
    },
    {
      no: 6,
      nama: "Hazelnut Dream Brew",
      terjual: "70 Cup",
      keuntungan: "IDR 4.000.000",
    },
    {
      no: 7,
      nama: "Vanilla Silk Mocha",
      terjual: "60 Cup",
      keuntungan: "IDR 3.000.000",
    },
    {
      no: 8,
      nama: "Dark Roast Delight",
      terjual: "50 Cup",
      keuntungan: "IDR 2.000.000",
    },
    {
      no: 9,
      nama: "Ethiopian Yirgacheffe Euphoria",
      terjual: "40 Cup",
      keuntungan: "IDR 1.000.000",
    },
    {
      no: 10,
      nama: "Indonesian Sumatra Reserve",
      terjual: "30 Cup",
      keuntungan: "IDR 500.000",
    },
  ];
  return (
    <>
      <section>
        <div className="mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 md:p-8 border-b border-gray-100">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-0">
                Produk Terlaris
              </h2>

              {/* Date Picker */}
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:border-gray-300 bg-gray-50 w-fit">
                <Calendar className="w-4 h-4 text-gray-600" />
                <select>
                  {dateRange.map((range, i) => (
                    <option key={i} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 w-20">
                      No
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                      Nama Produk
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                      Terjual
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                      Keuntungan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.no}
                      className={`border-b border-gray-50 transition-colors hover:bg-gray-50 ${
                        product.no % 2 === 1 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="py-5 px-6 text-gray-600 text-sm">
                        {product.no}
                      </td>
                      <td className="py-5 px-6 text-gray-700 font-medium">
                        {product.nama}
                      </td>
                      <td className="py-5 px-6 text-gray-600">
                        {product.terjual}
                      </td>
                      <td className="py-5 px-6 text-green-600 font-semibold">
                        {product.keuntungan}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Products;

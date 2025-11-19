import { Calendar } from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

function Chart() {
  const dateRanges = [
    "16 - 23 January 2023",
    "24 - 31 January 2023",
    "1 - 7 February 2023",
  ];

  // Dummy data
  const data = [
    { date: "16 Jan", value: 90 },
    { date: "17 Jan", value: 105 },
    { date: "18 Jan", value: 85 },
    { date: "19 Jan", value: 135 },
    { date: "20 Jan", value: 125 },
    { date: "21 Jan", value: 155 },
    { date: "22 Jan", value: 165 },
    { date: "23 Jan", value: 145 },
    { date: "24 Jan", value: 195 },
    { date: "25 Jan", value: 185 },
    { date: "26 Jan", value: 200 },
    { date: "27 Jan", value: 210 },
    { date: "28 Jan", value: 205 },
    { date: "29 Jan", value: 225 },
  ];
  return (
    <>
      <section className="bg-gradient-to-br">
        <div className="mx-auto">
          {/* --- Main Chart Card --- */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
            {/* --- Header Section -- */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Total Penjualan
                </h2>
                <p className="text-gray-500 flex items-center gap-2">
                  <span className="font-semibold text-gray-700">1000 cup</span>
                  <span className="text-sm">16 - 23 January 2023</span>
                </p>
              </div>

              {/* Date Picker */}
              <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-gray-300 bg-gray-50">
                <Calendar className="w-5 h-5 text-gray-600" />
                <select>
                  {dateRanges.map((range, i) => (
                    <option key={i} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </button>
            </div>

            {/* Chart */}
            <div className="w-full h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f0f0f0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    tickFormatter={(value) => `${value}c`}
                    ticks={[0, 50, 100, 150, 200, 250, 300]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                    formatter={(value) => [`${value} cup`, "Penjualan"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#colorValue)"
                    dot={false}
                    activeDot={{
                      r: 6,
                      fill: "#10b981",
                      strokeWidth: 2,
                      stroke: "white",
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Chart;

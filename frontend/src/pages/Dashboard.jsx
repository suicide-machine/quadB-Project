import React, { useEffect, useState } from "react"
import { FaTelegram } from "react-icons/fa"

const Dashboard = () => {
  const [result, setResult] = useState([])

  const responseForSavingData = async () => {
    const res = await fetch("http://localhost:5000/api/fetch-cryptos", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const data = await res.json()
    console.log("Data saved:", data)
  }

  const responseForFetchData = async () => {
    const res = await fetch("http://localhost:5000/api/saved", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const data = await res.json()
    console.log("Fetched Data:", data)

    const formattedData = Object.keys(data).map((key) => {
      const item = data[key]
      const lastPrice = parseFloat(item.last)
      const buyPrice = parseFloat(item.buy)
      const sellPrice = parseFloat(item.sell)

      const difference =
        buyPrice && sellPrice ? ((sellPrice - buyPrice) / buyPrice) * 100 : 0
      const savings = buyPrice && sellPrice ? Math.abs(sellPrice - buyPrice) : 0

      return {
        platform: item.name,
        lastPrice: lastPrice ? `₹${lastPrice.toLocaleString()}` : "N/A",
        buyPrice: buyPrice,
        sellPrice: sellPrice,
        difference: difference.toFixed(2),
        savings: `₹${savings.toLocaleString()}`,
      }
    })
    setResult(formattedData)
  }

  useEffect(() => {
    responseForSavingData()
    responseForFetchData()
  }, [])

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center px-4">
      {/* Header */}
      <header className="w-full max-w-6xl py-4 flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-teal-400 mb-4 sm:mb-0">
          HODLINFO
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <select className="bg-gray-800 p-2 rounded w-full sm:w-auto">
            <option>INR</option>
            <option>USD</option>
          </select>
          <select className="bg-gray-800 p-2 rounded w-full sm:w-auto">
            <option>BTC</option>
            <option>ETH</option>
          </select>
          <button className="bg-teal-400 text-gray-900 px-4 py-2 rounded font-semibold w-full sm:w-auto">
            BUY BTC
          </button>
          <button className="bg-teal-500 px-4 py-2 rounded flex items-center gap-2 w-full sm:w-auto">
            <FaTelegram />
            Connect Telegram
          </button>
        </div>
      </header>

      {/* Price and Stats Section */}
      <div className="w-full max-w-6xl text-center py-4 sm:py-8">
        <div className="flex justify-around text-gray-400 text-xs sm:text-sm mb-2 sm:mb-4">
          <span>0.1% 5 Mins</span>
          <span>0.96% 1 Hour</span>
          <span>2.73% 1 Day</span>
          <span>7.51% 7 Days</span>
        </div>
        <div className="text-3xl sm:text-5xl font-bold text-white">
          ₹ 26,56,110
        </div>
        <div className="text-gray-400 mt-2 text-sm sm:text-base">
          Best Price to Trade
          <br />
          Average BTC/INR net price including commission
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full max-w-6xl px-4 sm:px-6">
        <table className="w-full bg-gray-800 rounded-lg overflow-hidden text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-700 text-gray-400 text-left">
              <th className="p-2 sm:p-4">#</th>
              <th className="p-2 sm:p-4">Platform</th>
              <th className="p-2 sm:p-4">Last Traded Price</th>
              <th className="p-2 sm:p-4">Buy / Sell Price</th>
              <th className="p-2 sm:p-4">Difference</th>
              <th className="p-2 sm:p-4">Savings</th>
            </tr>
          </thead>
          <tbody>
            {result.length > 0 ? (
              result.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="p-2 sm:p-4">{index + 1}</td>
                  <td className="p-2 sm:p-4">{item.platform}</td>
                  <td className="p-2 sm:p-4">{item.lastPrice}</td>
                  <td className="p-2 sm:p-4">
                    {item.buyPrice} / {item.sellPrice}
                  </td>
                  <td
                    className={`p-2 sm:p-4 ${
                      parseFloat(item.difference) < 0
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {item.difference}%
                  </td>
                  <td className="p-2 sm:p-4 text-green-500">{item.savings}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-400">
                  Loading data...
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <button className="bg-teal-400 text-gray-900 px-4 py-2 rounded font-semibold w-full sm:w-auto">
            Add hodlinfo to home screen
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

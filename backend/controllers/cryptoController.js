const axios = require("axios")
const Crypto = require("../models/Crypto")

exports.fetchAndStoreTopCryptos = async (req, res) => {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers")
    const data = response.data

    const top10Cryptos = Object.values(data)
      .slice(0, 10)
      .map((crypto) => ({
        name: crypto.name,
        last: crypto.last,
        buy: crypto.buy,
        sell: crypto.sell,
        volume: crypto.volume,
        base_unit: crypto.base_unit,
      }))

    await Crypto.deleteMany()

    await Crypto.insertMany(top10Cryptos)

    res
      .status(200)
      .json({ message: "Top 10 cryptocurrencies saved successfully" })
  } catch (error) {
    console.error("Error fetching data:", error)
    res.status(500).json({ error: "Failed to fetch or store data" })
  }
}

exports.getSavedTickers = async (req, res) => {
  try {
    const tickers = await Crypto.find()
    res.status(200).json(tickers)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tickers", error: error.message })
  }
}

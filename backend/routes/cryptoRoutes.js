// routes/cryptoRoutes.js
const express = require("express")
const {
  fetchAndStoreTopCryptos,
  getSavedTickers,
} = require("../controllers/cryptoController")

const router = express.Router()

// Route to fetch and store top 10 cryptocurrencies
router.get("/fetch-cryptos", fetchAndStoreTopCryptos)
router.get("/saved", getSavedTickers)

module.exports = router

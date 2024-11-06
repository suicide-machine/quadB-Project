// server.js
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cryptoRoutes = require("./routes/cryptoRoutes")
require("dotenv").config()

const app = express()
const PORT = 5000

// Enable CORS for all routes
app.use(cors())

// MongoDB connection
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error))

// Routes
app.use("/api", cryptoRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

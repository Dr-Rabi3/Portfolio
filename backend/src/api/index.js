// src/server.js
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const app = require("../app");
const logger = require("../utils/logger");

dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

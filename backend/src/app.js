const express = require("express");
const path = require("path");
const cors = require("cors");

const projectsRoutes = require("./routes/projectRoutes");
const skillsRoutes = require("./routes/skillRoutes");
const awardsRoutes = require("./routes/awardRoutes");
const toolboxesRoutes = require("./routes/toolboxRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Enable CORS for all routes
const corsOptions = {
  origin: process.env.FRONT_URL, // Allow only this origin
  allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
};
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

// app.get("/", (req, res, next) => res.send({ message: "Hello, in MY Portfolio!" }));

app.use("/projects", projectsRoutes);
app.use("/toolboxes", toolboxesRoutes);
app.use("/awards", awardsRoutes);
app.use("/skills", skillsRoutes);

// Error handling middleware (should be after routes)
app.use(errorHandler);

module.exports = app;

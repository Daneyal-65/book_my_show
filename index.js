// app.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const Router = require("./routes/bookMyshow");
const { BookMovie } = require("./database/connector.cjs");
const port = 8080;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api", Router);

// Start server after ensuring MongoDB is connected

app.listen(port, async () => {
  console.log(`App listening on port ${port}!`);
});

module.exports = app;

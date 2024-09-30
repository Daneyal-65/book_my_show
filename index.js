// app.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const bookingApiRouter = require("./routes/bookMyshow");
const authRouter = require("./auth/auth.js");
const authenticateToken = require("./middleware/index.js");
const { BookMovie } = require("./database/connector.cjs");
const port = 8080;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/auth", authRouter);
app.use("/api", authenticateToken, bookingApiRouter);

// Start server after ensuring MongoDB is connected

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

module.exports = app;

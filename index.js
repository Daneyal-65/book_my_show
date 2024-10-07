const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const cors = require("cors");
const bookingApiRouter = require("./routes/bookMyshow");
const authRouter = require("./auth/auth.js");
const authenticateToken = require("./middleware/index.js");
const { BookMovie } = require("./database/connector.cjs");
const port = 8080;

app.use(cors());
app.use(express.json());
// Routes
app.use("/auth", authRouter);
app.use("/api", authenticateToken, bookingApiRouter);

// Start server after ensuring MongoDB is connected

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

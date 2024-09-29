const dotenv = require("dotenv");
dotenv.config();
// get the environment variables from the config file .
const mongoURI = process.env.ATLAS_URI || "";

const mongoose = require("mongoose");
const { bookMovieSchema } = require("../model/schema");

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connection established with MongoDB server online");
  })
  .catch((err) => {
    console.error("Error while connecting to MongoDB:", err);
  });
// booking schema is required for the db to register it.
const BookMovie = mongoose.model("BookMovie", bookMovieSchema);

module.exports = {
  BookMovie,
};

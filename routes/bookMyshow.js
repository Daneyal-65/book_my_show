// import all the required dependencies from the module
const express = require("express");
const { BookMovie } = require("../database/connector.cjs");
// define router using express router
const Router = express.Router();
// API for get all the movies
Router.get("/booking", async (req, res) => {
  console.log(req.user);
  try {
    // find the last booking in the collection
    // sort the last booking by _id in descending order
    const lastBooking = await BookMovie.findOne().sort({ _id: -1 });
    if (lastBooking) {
      res.status(200).json(lastBooking);
    } else {
      res.status(200).json({ message: "No previous booking found" });
    }
  } catch (ex) {
    res.status(500).json({ message: "Internal server error" });
    console.error(ex);
  }
});
// api for post request
Router.post("/booking", async (req, res) => {
  const { movie, seats, slot } = req.body;
  console.log(req.user);
  // Validate the request body
  if (!movie || !seats || !slot || !req.user) {
    return res.status(400).json({ message: "Invalid request body" });
  }
  try {
    const result = await BookMovie.findOneAndUpdate(
      {}, // empty filter to update the first document or create a new one if none exists
      { userId: req.user._id, movie, seats, slot },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    // console.log(result);
    res.status(200).json({ message: "Booking successful", ...result });
  } catch (ex) {
    res.status(500).json({ message: "Internal server error" });
    console.error(ex);
  }
});

module.exports = Router;

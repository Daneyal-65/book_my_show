// routes/bookMyshow.js
const express = require("express");
const { BookMovie } = require("../database/connector.cjs");

const Router = express.Router();
// API for get all the movies
Router.get("/booking", async (req, res) => {
  try {
    const lastBooking = await BookMovie.findOne().sort({ _id: -1 }); // for gettig last booking
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
// // API for adding booking (POST)
Router.post("/booking", async (req, res) => {
  const { movie, seats, slot } = req.body;

  // Validate the request body
  if (!movie || !seats || !slot) {
    return res.status(400).json({ message: "Invalid request body" });
  }
  try {
    const result = await BookMovie.findOneAndUpdate(
      {}, // empty filter to update the first document or create a new one if none exists
      { movie, seats, slot },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    // console.log(result);
    res.status(200).json({ message: "Booking successful" });
  } catch (ex) {
    res.status(500).json({ message: "Internal server error" });
    console.error(ex);
  }
});

module.exports = Router;

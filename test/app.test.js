const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const express = require("express");
const bodyParser = require("body-parser");
const { Schema, model } = mongoose;

let mongoServer;
let app;

const bookMovieSchema = new Schema({
  movie: String,
  slot: String,
  seats: {
    A1: Number,
    A2: Number,
    A3: Number,
    A4: Number,
    D1: Number,
    D2: Number,
  },
});

const BookMovie = model("BookMovie", bookMovieSchema);

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app = express();
  app.use(bodyParser.json());

  app.post("/api/booking", async (req, res) => {
    const { movie, seats, slot } = req.body;
    if (!movie || !seats || !slot) {
      return res.status(400).json({ message: "Invalid request body" });
    }
    try {
      await BookMovie.findOneAndUpdate(
        {},
        { movie, seats, slot },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      res.status(200).json({ message: "Booking successful" });
    } catch (ex) {
      res.status(500).json({ message: "Internal server error" });
      console.error(ex);
    }
  });

  app.get("/api/booking", async (req, res) => {
    try {
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

  app.use((req, res) => {
    res.status(404).json({ message: "Invalid endpoint" });
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Booking API", () => {
  beforeEach(async () => {
    await BookMovie.deleteMany({});
  });

  describe("POST /api/booking", () => {
    it("should create a new booking", async () => {
      const bookingData = {
        movie: "Inception",
        seats: { A1: 2, A2: 1, A3: 0, A4: 1, D1: 0, D2: 2 },
        slot: "3PM",
      };

      const response = await request(app)
        .post("/api/booking")
        .send(bookingData)
        .expect(200);

      expect(response.body).toEqual({ message: "Booking successful" });
    });

    it("should return 400 for invalid request body", async () => {
      const invalidData = { movie: "Inception" }; // Missing seats and slot

      const response = await request(app)
        .post("/api/booking")
        .send(invalidData)
        .expect(400);

      expect(response.body).toEqual({ message: "Invalid request body" });
    });
  });

  describe("GET /api/booking", () => {
    it("should return the last booking", async () => {
      const bookingData = {
        movie: "The Matrix",
        seats: { A1: 1, A2: 2, A3: 1, A4: 0, D1: 1, D2: 1 },
        slot: "6PM",
      };

      await request(app).post("/api/booking").send(bookingData).expect(200);

      const response = await request(app).get("/api/booking").expect(200);

      expect(response.body).toMatchObject(bookingData);
    });

    it("should return no booking found message when no bookings exist", async () => {
      const response = await request(app).get("/api/booking").expect(200);

      expect(response.body).toEqual({ message: "No previous booking found" });
    });
  });

  it("should return 404 for invalid endpoints", async () => {
    const response = await request(app).get("/api/nonexistent").expect(404);

    expect(response.body).toEqual({ message: "Invalid endpoint" });
  });
});

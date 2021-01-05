const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routes
const userRoutes = require("./routes/User");

// Set up express
const app = express();
app.use(express.json());
app.use(cors());

// Run on port 8000
const PORT = process.env.port || 8000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Set up mongoose
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) console.log(err);
    console.log("MongoDB Connected");
  }
);

// Setup routes
app.use("/users", userRoutes);

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();

// MongoDB
mongoose.connect(
  `mongodb+srv://gilbertaurel:${process.env.MONGO_ATLAS_PASSWORD}@jogja-app.e4izh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Image route
app.use("/uploads", express.static("uploads"));

// Cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

// Routes
const userRoutes = require("./api/routes/users");
const attractionRoutes = require("./api/routes/attractions");
app.use("/v1/users", userRoutes);
app.use("/v1/attractions", attractionRoutes);

// No route found erorr handler
app.use((req, res, next) => {
  const error = new Error("Path not found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;

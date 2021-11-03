require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect.js");
const ProductRouter = require("./routes/products.js");

const notFoundMiddleware = require("./middleware/not-found");

const errorMiddleware = require("./middleware/error-handler");

//middleware
app.use(express.json());

//routes

app.get("/", (req, res) => {
  console.log("hey");
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use("/api/v1/products", ProductRouter);

app.use(errorMiddleware);
app.use(notFoundMiddleware);
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, () => {
      console.log("server is listening ");
    });
  } catch (error) {
    console.log(error);
  }
};

start();

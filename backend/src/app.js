const express = require("express");
const cors = require("cors");

const productRoutes = require("./modules/product/product.routes");
const cartRoutes = require("./modules/cart/cart.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const { extend } = require("joi");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// health route
app.get("/", (req, res) => {
  res.json({ message: "API Running" });
});

// global error handler (ALWAYS LAST)
app.use(errorMiddleware);

module.exports = app;

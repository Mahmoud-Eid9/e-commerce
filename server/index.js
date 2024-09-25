const keys = require("./config/keys");

const express = require("express");
const cors = require("cors");
const pg = require("./config/db");
const authMiddleware = require("./middlewares/auth");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const productRoutes = require("./routes/products");
const {
  storeBestSellingProducts,
  retrieveObjects,
} = require("./db/redis/bestSelling");
const {
  getLatestProducts,
  storeLatestProducts,
} = require("./db/redis/latestProducts");
const scheduleJobs = require("./jobs/setHomePageProducts");
scheduleJobs();

const app = express();
app.use("/static", express.static("public"));
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", productRoutes);
app.use(authMiddleware);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);

storeBestSellingProducts()
  .then((res) => {})
  .catch();

storeLatestProducts()
  .then((res) => {
    console.log("Stored latest products in redis");
  })
  .catch();

retrieveObjects()
  .then((res) => {})
  .catch((rej) => {
    console.log("retrive data from redis : \n" + rej);
  });

getLatestProducts()
  .then((res) => {})
  .catch((rej) => {
    console.log("retrive data from redis : \n" + rej);
  });

pg.on("error", () => console.log("Lost PG connection"));

app.get("/", async (req, res) => {
  const data = await pg.query("select * from customers");
  res.status(200).send(data.rows);
});

app.listen(8000, () => {
  console.log("listening on 8000.....");
});

const express = require("express");
const cors = require("cors");

const { title } = require("process");

const usersRoute = require("./routes/users");
const categoryRoute = require("./routes/category");
const travelsRoute = require("./routes/travels");
const wishlistRoute = require("./routes/wishlist");

const port = 8010;
const server = express();

server.use(cors());
server.use(express.json());

server.use("/users", usersRoute);
server.use("/category", categoryRoute);
server.use("/travels", travelsRoute);
server.use("/wishlist", wishlistRoute);

server.get("/", (req, res) => {
  res.send("Hello World");
});
server.listen(port, () => {
  console.log(`Сервер ажиллаж байна ${port}`);
});

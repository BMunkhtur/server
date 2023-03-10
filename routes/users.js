const { Router } = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt");
const { getAllUsers, createUser, getUser } = require("../controllers/users");

const router = Router();

router.post("/signin", (req, res) => {
  const { id, email, password } = req.body;
  const data = connection;
  const parsedData = JSON.parse(data);
  const findUser = parsedData.users.find((user) => user.email === email);
  if (!findUser) {
    res.status(401).json({ message: "Ийм хэрэглэгч олдсонгүй" });
  }
  const isCheck = bcrypt.compareSync(password, findUser.password);
  if (isCheck) {
    res.status(200).json({ message: "амжилттай нэвтэрлэлээ", user: findUser });
  } else {
    res
      .status(401)
      .json({ message: "имэйл эсвэл нууц үг буруу байна", user: null });
  }
});
router.post("/signup", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUser);
module.exports = router;

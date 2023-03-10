const { Router } = require("express");
const cors = require("cors");
const fs = require("fs");
const { getWishlist, deleteWishlist } = require("../controllers/wishlist");

const router = Router();

router.get("/", getWishlist);
router.delete("/:id", deleteWishlist);

module.exports = router;

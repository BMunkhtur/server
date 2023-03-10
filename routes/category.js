const { Router } = require("express");

const {
  createCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
  updateCategory,
} = require("../controllers/category");
const router = Router();

router.post("/", createCategory);
router.get("/", getAllCategory);
router.get("/:id", getCategory);
router.delete("/:id", deleteCategory);
router.put("/:id", updateCategory);

module.exports = router;

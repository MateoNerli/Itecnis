const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/products");

router.get("/", ProductController.getAllProducts);
router.get("/categories", ProductController.listCategories);
router.get("/category/:category", ProductController.getProductsByCategory);
router.get("/:id", ProductController.getProductById);
router.patch("/stock/:id", ProductController.updateStock);

module.exports = router;

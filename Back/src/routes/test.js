const express = require("express");
const router = express.Router();

const { getProductTemplatesWithCategoryNames } = require("../controllers/test");

router.get("/", getProductTemplatesWithCategoryNames);

module.exports = router;

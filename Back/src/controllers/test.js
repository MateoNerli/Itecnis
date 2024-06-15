const {
  queryProductTemplatesWithCategoryNames,
} = require("../db/config/config.js");

async function getProductTemplatesWithCategoryNames(req, res) {
  try {
    const productTemplates = await queryProductTemplatesWithCategoryNames();
    res.json(productTemplates);
  } catch (error) {
    console.error("Error en la consulta:", error);
    res.status(500).send("Error en la consulta");
  }
}

module.exports = { getProductTemplatesWithCategoryNames };

const { Pool } = require("pg");

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: "rouser",
  host: "200.107.98.2",
  database: "freshco_prod",
  password: "ROsdtest123",
  port: 5432,
});

async function queryProductTemplatesWithCategoryNames() {
  const client = await pool.connect();
  try {
    const queryText = `
      SELECT pt.*, pc.name AS category_name
      FROM product_template pt
      LEFT JOIN product_category pc ON pt.categ_id = pc.id
      WHERE pt.categ_id IS NOT NULL AND pt.list_price IS NOT NULL
      LIMIT 400;
    `;
    const res = await client.query(queryText);
    return res.rows;
  } finally {
    client.release();
  }
}

module.exports = { queryProductTemplatesWithCategoryNames };

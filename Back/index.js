const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

const test = require("./src/routes/test");
const productsRoutes = require("./src/routes/productsRoutes");

app.use(bodyParser.json());

app.use("/test", test);
app.use("/products", productsRoutes);

// const {
//   filterAndSaveProducts,
// } = require("./src/controllers/filterAndSaveProducts");
// filterAndSaveProducts()
//   .then(() => {
//     console.log("Proceso de filtrado y guardado de productos completado.");
//   })
//   .catch((error) => {
//     console.error(
//       "Error en el proceso de filtrado y guardado de productos:",
//       error
//     );
//   });

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

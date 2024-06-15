const Product = require("../db/models/Product"); // Importa el modelo Product
const {
  queryProductTemplatesWithCategoryNames,
} = require("../db/config/config"); // Importa la función de consulta
const sequelize = require("../db/config/database"); // Importa el objeto Sequelize

// Función para filtrar y guardar productos en la base de datos local
async function filterAndSaveProducts() {
  try {
    console.log("Obteniendo productos desde la base de datos remota...");
    const productTemplates = await queryProductTemplatesWithCategoryNames();
    console.log("Número de productos obtenidos:", productTemplates.length);

    // Filtrado de datos
    console.log("Filtrando datos...");
    const filteredProducts = productTemplates.map((product) => ({
      title: product.name,
      price: product.list_price,
      category: product.category_name,
      image: getRandomImage(),
      description: product.description_sale,
      stock: 100,
    }));

    console.log(
      "Número de productos después del filtrado:",
      filteredProducts.length
    );

    // Almacenamiento en la base de datos local
    console.log("Guardando productos filtrados en la base de datos local...");
    await sequelize.sync(); // Sincroniza los modelos con la base de datos

    await Product.bulkCreate(filteredProducts); // Crea los productos en la base de datos local

    console.log(
      "Productos filtrados y guardados exitosamente en la base de datos local."
    );
  } catch (error) {
    console.error("Error al filtrar y guardar los productos:", error);
  }
}

function getRandomImage() {
  const images = [
    "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1642&q=80",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/34/BA1yLjNnQCI1yisIZGEi_2013-07-16_1922_IMG_9873.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1194&q=80",
    "https://images.unsplash.com/photo-1559666126-84f389727b9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1177&q=80",
    "https://images.unsplash.com/photo-1527489377706-5bf97e608852?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1559&q=80",
    "https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
  ];
  return images[Math.floor(Math.random() * images.length)];
}

module.exports = { filterAndSaveProducts };

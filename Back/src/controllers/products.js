const { Sequelize } = require("sequelize");
const sequelize = require("../db/config/database");
const Product = require("../db/models/Product");

const ProductController = {
  async getAllProducts(req, res) {
    try {
      const { page = 1, limit = 12, sort = "asc" } = req.query;
      const offset = (page - 1) * limit;
      const products = await Product.findAndCountAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [["price", sort.toUpperCase()]],
      });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getProductById(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id.trim());
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async listCategories(req, res) {
    try {
      const products = await Product.findAll();
      const categories = [
        ...new Set(products.map((product) => product.category)),
      ];
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getProductsByCategory(req, res) {
    const { category } = req.params;
    try {
      const { page = 1, limit = 12, sort = "asc" } = req.query;
      const offset = (page - 1) * limit;
      const products = await Product.findAndCountAll({
        where: { category },
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [["price", sort.toUpperCase()]],
      });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateStock(req, res) {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
      const product = await Product.findByPk(id.trim());
      if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      if (quantity <= 0) {
        return res
          .status(400)
          .json({ message: "La cantidad debe ser mayor que cero" });
      }
      if (product.stock < quantity) {
        return res.status(400).json({ message: "Stock insuficiente" });
      }
      product.stock -= quantity;
      await product.save();
      res.json({ message: "Stock actualizado exitosamente", product });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = ProductController;

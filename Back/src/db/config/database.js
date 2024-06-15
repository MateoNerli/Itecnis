const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("Itecnis", "postgres", "root", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;

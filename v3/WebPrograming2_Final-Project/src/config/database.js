const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_URL ||
    "postgres://postgres:postgres@localhost:5432/final_project", // Đổi lại mật khẩu cho phù hợp với máy
  {
    dialect: "postgres",
    dialectOptions: {},
  }
);

module.exports = sequelize;

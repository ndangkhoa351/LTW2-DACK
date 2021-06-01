const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/db_cinema');
//const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/final_project');
// , {
//   dialect: 'postgres',
//   dialectOptions: {
// }
// } 
module.exports = sequelize;

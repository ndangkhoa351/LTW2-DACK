const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/db_cinema');

// , { 
//   dialect: 'postgres',
//   dialectOptions: {
// }
// }

module.exports = sequelize;

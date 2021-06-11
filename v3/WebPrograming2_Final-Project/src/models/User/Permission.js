const {Sequelize} = require('sequelize');
const db = require('../../config/database');

const Permission = db.define('Permission', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
    }
},{
    freezeTableName: true,
    tableName: "permissions",
});

module.exports = Permission;
    
    const {Sequelize} = require('sequelize');
    const db = require('../../config/database');
    const User = require('../User/User');

    db.authenticate();

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
    })

    Permission.belongsTo(User);

    module.exports = Permission;
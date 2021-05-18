    
    const { DataTypes } = require('sequelize');
    const db = require('../../config/database');
    //const User = require('../User/User');

    db.authenticate();

    const Permission = db.define('Permission', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    //Permission.belongsTo(User);

    module.exports = Permission;
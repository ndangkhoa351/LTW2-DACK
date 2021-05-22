    
    const {Sequelize, DataTypes} = require('sequelize');
    const db = require('../../config/database');

    db.authenticate();

    const ShowTime = db.define('ShowTime', {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        startTime: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        endTime: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });

    module.exports = ShowTime;
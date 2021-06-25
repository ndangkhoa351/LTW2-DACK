    
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
            primaryKey: true,
        },
        endTime: {
            type: Sequelize.DATE,
            primaryKey: true,
            allowNull: false,
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        cinema_id: {
            type: Sequelize.UUID,
        },
        film_id: {
            type: Sequelize.UUID,
        }
    },{
        freezeTableName: true,
        tableName: "showtimes",
    });

    module.exports = ShowTime;
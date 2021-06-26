    
    const { Sequelize, DataTypes } = require('sequelize');
    const db = require('../../config/database');
    const Ticket = require('../Ticket/Ticket');


    db.authenticate();

    const Booking = db.define('Booking', {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        bookTime: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        totalMoney: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: Sequelize.UUID,
        },
        showtime_id: {
            type: Sequelize.UUID,
        }
    },{
        freezeTableName: true,
        tableName: "bookings",
    });

    module.exports = Booking;
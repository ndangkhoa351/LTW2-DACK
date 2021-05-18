    
    const { Sequelize } = require('sequelize');
    const db = require('../../config/database');
    const Ticket = require('../Ticket/Ticket');


    db.authenticate();

    const Booking = db.define('Booking', {
        idBooking: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        idUser: {
            type: Sequelize.INTEGER,
            
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        displayName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });

    Booking.hasMany(Ticket);

    module.exports = Booking;
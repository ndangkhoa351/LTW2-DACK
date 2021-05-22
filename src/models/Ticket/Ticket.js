    
    const {Sequelize, DataTypes} = require('sequelize');
    const db = require('../../config/database');
    const Booking = require('../Booking/Booking');

    db.authenticate();

    const Ticket = db.define('Ticket', {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        chairCode: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        horizontalAddress: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        verticleAddress: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    });

    module.exports = Ticket;
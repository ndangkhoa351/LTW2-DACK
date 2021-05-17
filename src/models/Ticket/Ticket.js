
    const {Sequelize} = require('sequelize');
    const db = require('../../config/database');
    const Booking = require('../Booking/Booking');


    db.authenticate();

    const Ticket = db.define('Ticket', {
        id: {
            type: Sequelize.INTERGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        idBooking: {
            type: Sequelize.INTERGER,
            allowNull: false,
            references: {
                model: Booking,
                key: 'id',
            }
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
            type: Sequelize.INTERGER,
            allowNull: false,
        }
    })
    
    Ticket.belongsTo(Booking);

    module.exports = Ticket;
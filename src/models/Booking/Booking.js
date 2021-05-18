    
    const { DataTypes } = require('sequelize');
    const db = require('../../config/database');
    const ShowTime = require('../ShowTime/ShowTime');
    const Users = require('../User/User');

    db.authenticate();

    const Booking = db.define('Booking', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        timeBooking: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        total: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        
    });

    Booking.belongsTo(Users);
    Users.hasMany(Booking);

    Booking.belongsTo(ShowTime);
    ShowTime.hasMany(Booking);

    module.exports = Booking;
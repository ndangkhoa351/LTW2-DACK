    
    const { DataTypes } = require('sequelize');
    const db = require('../../config/database');
    //const Booking = require('../Booking/Booking');
    const Cinema = require('../Cinema/Cinema');
    const Film = require('../Film/Film');

    db.authenticate();

    const ShowTime = db.define('ShowTime', {       
        startTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        ticketPrice: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        }
    });

    //ShowTime.removeAttribute('id');

    ShowTime.belongsTo(Film);
    Film.hasMany(ShowTime);

    ShowTime.belongsTo(Cinema);
    Cinema.hasMany(ShowTime);

    //Film.belongsToMany(Cinema, { through: ShowTime });
    //Cinema.belongsToMany(Film, { through: ShowTime });
    

    //ShowTime.addConstraint()

    module.exports = ShowTime;
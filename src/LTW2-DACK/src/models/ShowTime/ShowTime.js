    
    const {Sequelize} = require('sequelize');
    const db = require('../../config/database');
const Booking = require('../Booking/Booking');
    const Cinema = require('../Cinema/Cinema');
    const Film = require('../Film/Film');

    db.authenticate();

    const ShowTime = db.define('ShowTime', {
        id: {
            type: Sequelize.INTERGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        idCinema: {
            type: Sequelize.INTERGER,
            allowNull: false,
            references: {
                model: Cinema,
                key: 'id',
            }
        },
        idFilm: {
            type: Sequelize.INTERGER,
            allowNull: false,
            references: {
                model: Film,
                key: 'id',
            }
        },
        cinemaType: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        horizontalSize: {
            type: Sequelize.INTERGER,
            allowNull: false,
        },
        verticleSize: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });

    Cinema.belongsToMany(Film, {through: ShowTime});
    ShowTime.belongsToMany(User, {through: Booking});

    module.exports = ShowTime;
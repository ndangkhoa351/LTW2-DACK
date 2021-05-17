    
    const {Sequelize} = require('sequelize');
    const db = require('../../config/database');
    const Cinema = require('../Cinema/Cinema');
    const ShowTime = require('../ShowTime/Showtime');

    db.authenticate();

    const Film = db.define('Film', {
        id: {
            type: Sequelize.INTERGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        displayName: {
            type: Sequelize.STRING,
            allowNull: false,
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

    Film.belongsToMany(Cinema, {through: ShowTime});

    module.exports = Film;
    
    const {Sequelize} = require('sequelize');
    const db = require('../../config/database');
    const CinemaCluster = require('../CinemaCluster/CinemaCluster');
    const Film = require('../Film/Film');
    const ShowTime = require('../ShowTime/Showtime');

    db.authenticate();

    const Cinema = db.define('Cinema', {
        id: {
            type: Sequelize.INTERGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        idOwnerCluster: {
            type: Sequelize.INTERGER,
            allowNull: false,
            references: {
                model: CinemaCluster,
                key: 'id',
            }
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

    Cinema.belongsTo(CinemaCluster);
    Cinema.belongsToMany(Film, {through: ShowTime});

    module.exports = Cinema;
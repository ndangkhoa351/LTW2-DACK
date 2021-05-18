    
    const { DataTypes } = require('sequelize');
    const db = require('../../config/database');
    //const CinemaCluster = require('../CinemaCluster/CinemaCluster');
    //const Film = require('../Film/Film');
    //const ShowTime = require('../ShowTime/Showtime');

    db.authenticate();

    const Cinema = db.define('Cinema', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        
        displayName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cinemaType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        horizontalSize: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        verticleSize: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    //Cinema.belongsTo(CinemaCluster);
    //Cinema.belongsToMany(Film, {through: ShowTime});

    module.exports = Cinema;
    
    const { DataTypes } = require('sequelize');
    const db = require('../../config/database');

    db.authenticate();

    const Film = db.define('Film', {
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
        premiereDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        poster: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
        movieDuration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    //Film.belongsToMany(Cinema, {through: ShowTime});

    module.exports = Film;
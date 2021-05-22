    
    const {Sequelize, DataTypes} = require('sequelize');
    const db = require('../../config/database');
    const Cinema = require('../Cinema/Cinema');
    const ShowTime = require('../ShowTime/Showtime');

    db.authenticate();

    const Film = db.define('Film', {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        displayName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        publishDay: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        horizontalSize: {
            type: DataTypes.BLOB,
            allowNull: false,
        },
        time: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });
    
    module.exports = Film;
    
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
        publishDate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        poster: {
            type: DataTypes.BLOB,
            allowNull: true,
        },
        time: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    },{
        freezeTableName: true,
        tableName: "films",
    });
    
    module.exports = Film;
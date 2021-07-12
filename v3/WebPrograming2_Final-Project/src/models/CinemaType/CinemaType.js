const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../config/database');
const Cinema = require('../Cinema/Cinema');

db.authenticate();

const CinemaType = db.define(
    'CinemaType',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        typeName: DataTypes.STRING,
    },
    {
        freezeTableName: true,
        tableName: 'cinemaTypes',
    }
);


module.exports = CinemaType;

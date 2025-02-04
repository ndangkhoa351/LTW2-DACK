const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../config/database');

db.authenticate();

const Film = db.define(
    'Film',
    {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
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
            defaultValue: null,
            allowNull: true,
        },
        time: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        overview: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        trailer: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        view: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
    },
    {
        freezeTableName: true,
        tableName: 'films',
    }
);

module.exports = Film;

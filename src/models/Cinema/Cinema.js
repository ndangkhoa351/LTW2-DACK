const {Sequelize, DataTypes} = require('sequelize');
const db = require('../../config/database');
const CinemaCluster = require('../CinemaCluster/CinemaCluster');
const Film = require('../Film/Film');
const ShowTime = require('../ShowTime/Showtime');

db.authenticate();

const Cinema = db.define('Cinema', {
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
    cinemaType: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    horizontalSize: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    verticleSize: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

Cinema.belongsTo(CinemaCluster, {
    foreignKey: "ownerCluster_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

module.exports = Cinema;
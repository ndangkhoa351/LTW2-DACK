const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../config/database');
const CinemaCluster = require('../CinemaCluster/CinemaCluster');
const CinemaType = require('../CinemaType/CinemaType');


db.authenticate();

const Cinema = db.define(
    'Cinema',
    {
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
        avatar: {
            type: DataTypes.BLOB,
            defaultValue: null,
            allowNull: true,
        },
        horizontalSize: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        verticleSize: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        tableName: 'cinemas',
    }
);

Cinema.belongsTo(CinemaCluster, {
    foreignKey: 'ownerCluster_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Cinema.belongsTo(CinemaType, {
    foreignKey: 'type_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

module.exports = Cinema;




    const {Sequelize, DataTypes} = require('sequelize');
    const db = require('../../config/database');

    const CinemaCluster = db.define('CinemaCluster', {

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
        address: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lat: Sequelize.FLOAT,
        lng: Sequelize.FLOAT,
    },{
        freezeTableName: true,
        tableName: "cinema_clusters"
    });

    module.exports = CinemaCluster;
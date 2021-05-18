    const { DataTypes } = require('sequelize');
    const db = require('../../config/database');
    const Cinema = require('../Cinema/Cinema');

    db.authenticate();

    const CinemaCluster = db.define('CinemaCluster', {
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
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    
    Cinema.belongsTo(CinemaCluster);
    CinemaCluster.hasMany(Cinema);
    //CinemaCluster.hasMany(Cinema);

    module.exports = CinemaCluster;
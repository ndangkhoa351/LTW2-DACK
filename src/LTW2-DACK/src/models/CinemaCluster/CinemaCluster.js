    
    const {Sequelize} = require('sequelize');
    const db = require('../../config/database');
    const Cinema = require('../Cinema/Cinema');

    db.authenticate();

    const CinemaCluster = db.define('CinemaCluster', {
        id: {
            type: Sequelize.INTERGER,
            autoIncrement: true,
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
    });
    
    CinemaCluster.hasMany(Cinema);

    module.exports = CinemaCluster;
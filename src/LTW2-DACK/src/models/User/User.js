    
    const {Sequelize} = require('sequelize');
    const db = require('../../config/database');
const Booking = require('../Booking/Booking');
const ShowTime = require('../ShowTime/Showtime');
    const Permission = require('./Permission');


    db.authenticate();

    const User = db.define('User', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        displayName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        permission_id: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: Permission,
                key: 'id'
            }
        }
    })

    User.hasOne(Permission);
    User.belongsToMany(ShowTime, {through: Booking});

    module.exports = User;
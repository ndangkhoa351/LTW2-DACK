    
    const { DataTypes } = require('sequelize');
    const db = require('../../config/database');
    //const { sequelize } = require('../CinemaCluster/CinemaCluster');
    //const Booking = require('../Booking/Booking');
    //const ShowTime = require('../ShowTime/Showtime');
    const Permission = require('./Permission');

    const a = require('../CinemaCluster/CinemaCluster'); //gọi để nó chạy để hoàn thành db
    const b = require('../Film/Film');
    const c = require('../ShowTime/ShowTime');
    

    db.authenticate();

    const User = db.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber:{
            type: DataTypes.STRING,
            allowNull: false
        },
    })

    User.belongsTo(Permission);
    Permission.hasMany(User);

    module.exports = User;
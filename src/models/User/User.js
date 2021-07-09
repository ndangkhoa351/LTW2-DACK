const { Sequelize, UUID, DataTypes } = require('sequelize');
const Booking = require('../Booking/Booking');
const Cinema = require('../Cinema/Cinema');
const Film = require('../Film/Film');
const ShowTime = require('../ShowTime/ShowTime');
const db = require('../../config/database');
const Permission = require('./Permission');
const Ticket = require('../Ticket/Ticket');

db.authenticate();

const User = db.define(
    'User',
    {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        displayName: {
            type: Sequelize.STRING,
            defaultValue: 2,
            allowNull: false,
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        wallet: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        tableName: 'users',
    }
);

User.belongsTo(Permission, {
    foreignKey: 'permission_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});


// ShowTime.belongsTo(Film, {foreignKey: 'film_id'});
// ShowTime.belongsTo(Cinema, {foreignKey: 'cinema_id'});

Cinema.hasMany(ShowTime, {
    foreignKey: 'cinema_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Film.hasMany(ShowTime, {
    foreignKey: 'film_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});


// User.belongsToMany(ShowTime, { through: Booking, foreignKey: 'user_id' });
// ShowTime.belongsToMany(User, { through: Booking, foreignKey: 'showtime_id' });

User.hasMany(Booking, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

ShowTime.hasMany(Booking, {
    foreignKey: 'showtime_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});


Booking.hasMany(Ticket, {
    foreignKey: 'booking_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

module.exports = User;

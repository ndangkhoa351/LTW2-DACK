const { Sequelize } = require('sequelize');

const sequelize = new Sequelize( process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/test",
    {
        dialect: 'postgres',
        dialectOptions: {
            /*ssl: {
                rejectUnauthorized: false,
            }*/
        },
    }
);

module.exports = sequelize;

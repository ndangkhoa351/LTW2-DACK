const sequelize = require('../../config/database');
const { Sequelize, QueryTypes } = require('sequelize');
const Film = require('../../models/Film/Film');
const Op = Sequelize.Op;

// --------------------------------- BASIC QUERY  ---------------------------------

Film.getByID = async function (id) {
    return Film.findByPk(id);
};

Film.getAll = async function () {
    return Film.findAll();
};

Film.add = async function (new_film) {
    const newFilm = await Film.create({
        displayName: new_film.displayName,
        publishDate: new_film.publishDate,
        overview: new_film.overview,
        trailer: new_film.trailer,
        time: new_film.time,
        poster: new_film.poster,
    });
    await newFilm.save();

    return newFilm;
};

Film.delete = async function (film_id_delete) {
    await Film.destroy({
        where: { uuid: film_id_delete },
    });
};

Film.updateRecord = async function (film_update) {
    try {
        const newFilmDetail = {
            displayName: film_update.displayName,
            publishDate: film_update.publishDate,
            time: film_update.time,
            poster: film_update.poster,
        };

        await Film.update(newFilmDetail, {
            where: { uuid: film_update.uuid },
        });
    } catch (error) {
        console.log(error);
    }
};

Film.updateView = async (id) => {
  const film = await Film.getByID(id);
    try {
        return await film.update(
            {
                view: film.view + 1,
            },
            {
                where: { uuid: id },
            }
        );
    } catch (error) {
      console.log(error);
    }
};

// --------------------------------- ADVANCED QUERY  ---------------------------------

Film.getNewest = async function () {
    return Film.findAll({
        where: {
            publishDate: {
                // new Date() return the current date.
                [Op.gte]: new Date() - 30 * 24 * 60 * 60 * 1000, //30 days
            },
        },
    });
};

Film.getMostViewed = async function () {
    const mostViewedFilms = sequelize.query(
        `SELECT f.*, COUNT(f.uuid) AS "view" FROM films f JOIN showtimes s ON f.uuid = s.film_id JOIN bookings b ON b.showtime_id = s.uuid GROUP BY f.uuid ORDER BY f.uuid DESC LIMIT 5`,
        { type: QueryTypes.SELECT }
    );

    return mostViewedFilms;
};

Film.report = async function (fromDate, toDate) {
    const reportFilm = sequelize.query(
        `SELECT f.*, COUNT(f.uuid) AS "view",  COUNT(b.uuid) AS "NumberBooking",COUNT(t.uuid) AS "NumberTicket",SUM(b."totalMoney") AS "Total_Revenue" FROM films f JOIN showtimes s ON f.uuid = s.film_id 
    JOIN bookings b ON b.showtime_id = s.uuid JOIN tickets t on t.booking_id = b.uuid 
    WHERE t."createdAt" BETWEEN '${fromDate}' AND '${toDate}' GROUP BY f.uuid`,
        { type: QueryTypes.SELECT }
    );
    return reportFilm;
};

Film.getByName = async function (name) {
    const film = sequelize.query(
        `SELECT f.* FROM films f WHERE LOWER(f."displayName") LIKE N'%${name.toLowerCase()}%'`,
        { type: QueryTypes.SELECT }
    );
    return film;
};

Film.getCinemaCluster = async function (id) {
    const film = sequelize.query(
        `SELECT DISTINCT cs.* FROM films f JOIN showtimes s ON f.uuid = s.film_id JOIN cinemas c ON c.uuid = s.cinema_id JOIN cinema_clusters cs ON cs.uuid = c."ownerCluster_id" WHERE f."uuid" = '${id}'`,
        { type: QueryTypes.SELECT }
    );
    return film;
};

Film.getShowtimes = async function (filmID, clusterID) {
    const film = sequelize.query(
        `SELECT DISTINCT s.*, c.* FROM showtimes s JOIN cinemas c ON c.uuid = s.cinema_id WHERE s."film_id" = '${filmID}' and c."ownerCluster_id" = '${clusterID}'`,
        { type: QueryTypes.SELECT }
    );
    return film;
};

Film.getShowtimesByCinema = async function (cinemaID) {
    const film = await sequelize.query(
        `SELECT s.*, c.*, f."displayName" AS "name" , f."uuid" AS "filmId", s."uuid" AS "showId" FROM showtimes s JOIN cinemas c ON c.uuid = s.cinema_id JOIN films f ON f.uuid = s.film_id WHERE c."uuid" = '${cinemaID}'`,
        { type: QueryTypes.SELECT }
    );
    return film;
};

module.exports = Film;

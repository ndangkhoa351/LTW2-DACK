const sequelize = require("../../config/database");
const { Sequelize, QueryTypes } = require("sequelize");
const Film = require("../../models/Film/Film");
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
    overview : new_film.overview,
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

    Film.update(newFilmDetail, {
      where: { uuid: film_update.uuid },
    });
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
        [Op.gte]: new Date() - 7 * 24 * 60 * 60 * 1000, //7 days
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

module.exports = Film;

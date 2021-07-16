const Cinema = require("../../models/Cinema/Cinema");
let sequelize = require("../../config/database");
const { QueryTypes } = require("sequelize");

Cinema.getByID = async function (id) {
  return Cinema.findByPk(id);
};

Cinema.getAll = async function () {
  return Cinema.findAll();
};

Cinema.add = async function (new_cinema) {
  const newCinema = await Cinema.create({
    displayName: new_cinema.displayName,
    type_id: new_cinema.type_id,
    horizontalSize: new_cinema.horizontalSize,
    verticleSize: new_cinema.verticleSize,
    ownerCluster_id: new_cinema.ownerCluster_id,
  });
  await newCinema.save();
  return newCinema;
};

Cinema.delete = async function (cinema_id_delete) {
  await Cinema.destroy({
    where: { uuid: cinema_id_delete },
  });
};

Cinema.updateRecord = async function (cinema_update) {
  try {
    const newCinemaDetail = {
      displayName: cinema_update.displayName,
      type_id: cinema_update.type_id,
      horizontalSize: cinema_update.horizontalSize,
      verticleSize: cinema_update.verticleSize,
      ownerCluster_id: cinema_update.ownerCluster_id,
    };

    Cinema.update(newCinemaDetail, {
      where: { uuid: cinema_update.uuid },
    });
  } catch (error) {
    console.log(error);
  }
};

Cinema.getAllCinemaWithFilmID = async function (film_id) {
  const cinemas = sequelize.query(
    `SELECT cc."uuid" as "clusAvatar" ,cc."displayName" as "clusName", c.*, s."startTime" AS "start", f."uuid" AS "filmId", c."uuid" AS "cinemaId", s."uuid" AS "showtimeId",s."price"  FROM cinemas c JOIN showtimes s on c.uuid = s.cinema_id JOIN films f ON f.uuid = s.film_id join cinema_clusters cc ON cc.uuid = c."ownerCluster_id" WHERE film_id = '${film_id}'`,
    { type: QueryTypes.SELECT }
  );
  return cinemas;
};

Cinema.getAllInfo = async function () {
  const cinemas = sequelize.query(
    `SELECT c.*, cc."displayName" as "clusName" FROM cinemas c join cinema_clusters cc ON cc.uuid = c."ownerCluster_id"`,
    { type: QueryTypes.SELECT }
  );
  return cinemas;
};

Cinema.getAllCinemaWithFilmIDAndClusID = async function (film_id, clus_id) {
  const cinemas = sequelize.query(
    `SELECT cc."uuid" as "clusAvatar" ,cc."displayName" as "clusName", c.*, s."startTime" AS "start", f."uuid" AS "filmId", c."uuid" AS "cinemaId", s."uuid" AS "showtimeId",s."price"  FROM cinemas c JOIN showtimes s on c.uuid = s.cinema_id JOIN films f ON f.uuid = s.film_id join cinema_clusters cc ON cc.uuid = c."ownerCluster_id" WHERE film_id = '${film_id}' and cc."uuid" = '${clus_id}'`,
    { type: QueryTypes.SELECT }
  );
  return cinemas;
};

Cinema.getWithShowTimeID = async function (showtime_id) {
  const cinemas = sequelize.query(
    `SELECT DISTINCT c.* FROM cinemas c JOIN showtimes s on c.uuid = s.cinema_id WHERE s.uuid = '${showtime_id}'`,
    { type: QueryTypes.SELECT }
  );
  return cinemas;
};

module.exports = Cinema;

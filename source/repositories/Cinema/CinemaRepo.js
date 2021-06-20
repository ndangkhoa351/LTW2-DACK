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
    type: new_cinema.type,
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
      type: cinema_update.type,
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
    `SELECT c.* FROM cinemas c JOIN showtimes s on c.uuid = s.cinema_id JOIN films f ON f.uuid = s.film_id WHERE film_id = '${film_id}'`,
    { type: QueryTypes.SELECT }
  );
  return cinemas;
};

module.exports = Cinema;

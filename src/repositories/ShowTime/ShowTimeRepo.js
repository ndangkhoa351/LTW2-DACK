const sequelize = require("../../config/database");
const { QueryTypes } = require("sequelize");
const ShowTime = require("../../models/ShowTime/ShowTime");

ShowTime.getByID = async function (id) {
  return ShowTime.findByPk(id);
};

ShowTime.getAll = async function () {
  return ShowTime.findAll();
};

ShowTime.add = async function (new_showTime) {
  const newShowTime = await ShowTime.create({
    startTime: new_showTime.startTime,
    endTime: new_showTime.endTime,
    price: new_showTime.price,
    cinema_id: new_showTime.cinema_id,
    film_id: new_showTime.film_id,
  });
  await newShowTime.save();
  return newShowTime;
};

ShowTime.delete = async function (showTime_id_delete) {
  await ShowTime.destroy({
    where: { uuid: showTime_id_delete },
  });
};

ShowTime.getAllWithCinemaAndFilm = async function (cinema_id, film_id) {
  const showtimes = await sequelize.query(
    `SELECT * FROM showtimes WHERE film_id = '${film_id}' AND cinema_id = '${cinema_id}'`,
    { type: QueryTypes.SELECT }
  );
  return showtimes;
};

ShowTime.getCinema = async function (showtime_id) {
  const showtimes = await sequelize.query(
    `SELECT st.*, c."displayName" AS "displayName" FROM showtimes st JOIN cinemas c on st."cinema_id" = c."uuid" LIMIT 1`,
    { type: QueryTypes.SELECT }
  );
  return showtimes;
};

ShowTime.updateRecord = async function (showtime_update) {
  try {
    const newShowTimeDetail = {
      startTime: showtime_update.startTime,
      endTime: showtime_update.endTime,
      price: showtime_update.price,
      cinema_id: showtime_update.cinema_id,
      film_id: showtime_update.film_id,
    };

    ShowTime.update(newShowTimeDetail, {
      where: { uuid: showtime_update.uuid },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = ShowTime;

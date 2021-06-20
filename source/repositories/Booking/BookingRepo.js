const sequelize = require("../../config/database");
const { QueryTypes } = require("sequelize");
const Booking = require("../../models/Booking/Booking");

Booking.getByID = async function (id) {
  return Booking.findByPk(id);
};

Booking.getAll = async function () {
  return Booking.findAll();
};

Booking.add = async function (new_booking) {
  const newBooking = await Booking.create({
    user_id: new_booking.user_id,
    showtime_id: new_booking.showtime_id,
    bookTime: new_booking.bookTime,
    totalMoney: new_booking.totalMoney,
  });
  await newBooking.save();
  return newBooking;
};

Booking.delete = async function (booking_id_delete) {
  await Booking.destroy({
    where: { uuid: booking_id_delete },
  });
};

Booking.getAllWithUserID = async function (userID) {
  const result = await sequelize.query(
    `SELECT s."startTime" "date", f."displayName" "film_name", f."uuid" "id_Film", c."displayName" "cinema_name", t."chairCode" "chair" FROM bookings b JOIN tickets t ON b.uuid = t.booking_id JOIN showtimes s ON s.uuid = b.showtime_id JOIN films f ON f.uuid = s.film_id JOIN users u ON u.uuid = b.user_id JOIN cinemas c ON c.uuid = s.cinema_id WHERE u.uuid = '${userID}'`,
    { type: QueryTypes.SELECT }
  );
  return result;
};

module.exports = Booking;

const express = require("express");
const BookingRepo = require("../../repositories/Booking/BookingRepo");
const router = express.Router();
const dateUtils = require('../../utils/date');

router.get("/", (req, res) => {
  const currentUser = req.currentUser;
  // not login yet
  if (!currentUser) {
    res.redirect("/");
  }
  // get Film ID booking.
  BookingRepo.getAllWithUserID(currentUser.uuid).then((bookingHistories) => {
    const bookingHistoryAfterFormatDate = bookingHistories.map((bookingHistory) => {
      const bookingHistoryCopy = {};

      bookingHistoryCopy.id_Film = bookingHistory.id_Film;
      bookingHistoryCopy.film_name = bookingHistory.film_name;
      bookingHistoryCopy.cinema_name = bookingHistory.cinema_name;
      bookingHistoryCopy.chair = bookingHistory.chair;
      bookingHistoryCopy.bookDate = bookingHistory.bookDate;

      return bookingHistoryCopy;
    });
    res.render("Booking/booking-history", { bookingHistoryAfterFormatDate });
  });
});

router.post("/", (req, res) => {});

module.exports = router;

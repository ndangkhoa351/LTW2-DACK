const express = require("express");
const BookingRepo = require("../../repositories/Booking/BookingRepo");
const router = express.Router();
let FILM_ID_BOOKING;

router.get("/", (req, res) => {
  const currentUser = req.currentUser;
  // not login yet
  if (!currentUser) {
    res.redirect("/");
  }
  // get Film ID booking.
  BookingRepo.getAllWithUserID(currentUser.uuid).then((bookingHistory) => {
      //console.log(bookingHistory);
    res.render("Booking/booking-history", { bookingHistory });
  });
});

router.post("/", (req, res) => {});

module.exports = router;

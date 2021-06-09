const express = require("express");
const router = express.Router();
const BookingRepo = require("../../repositories/Booking/BookingRepo");
const TicketRepo = require("../../repositories/Ticket/TicketRepo");

router.get("/choose-seat", (req, res) => {
  //To get available horizontal, verticle address

    const qFilmID = req.query.filmID;

  TicketRepo.getAllSeatUnvailable(qFilmID)
    .then((seatUnavailable) => {
        console.log(seatUnavailable);
      res.render("Booking/choose-seat", { seatUnavailable });
    })
    .catch((err) => {
      console.log(err);
      res.render("error/error");
    });
});

router.get("/confirm-booking", (req, res) => {

    const chairInfo = {
        chairCode: req.query.chairCode,
    }

    res.render("Booking/confirm-booking", {chairInfo});
});

router.post("/confirm-booking", (req, res) => {
  const qShowtimeID = req.query.showtimeID;
  const qChairCode = req.query.chairCode;
  const qHAddress = req.query.h_address;
  const qVAddress = req.query.v_address;

  const newBooking = {
    bookTime: new Date(),
    totalMoney: 45000,
    user_id: req.currentUser.uuid,
    showtime_id: qShowtimeID,
  };

  BookingRepo.add(newBooking)
    .then((bookingAdded) => {
      //Add Ticket After
      const newTicket = {
        chairCode: qChairCode,
        horizontalAddress: qHAddress,
        verticleAddress: qVAddress,
        price: 45000,
        booking_id: bookingAdded.uuid,
      };

      TicketRepo.add(newTicket).then((ticket) => {
        res.redirect("/booking-history");
      });
    })
    .catch((err) => {
      console.log(err);
    });

  // Add booking.
  // Add booking uuid to booking_id of ticket.
});

module.exports = router;

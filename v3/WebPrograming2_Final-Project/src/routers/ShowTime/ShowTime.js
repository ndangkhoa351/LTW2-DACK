const express = require("express");
const router = express.Router();
const dateUtils = require('../../utils/date');
const ShowTimeRepo = require("../../repositories/ShowTime/ShowTimeRepo");
let FILM_ID_CHOOSEN;
let CINEMA_ID_CHOOSEN;

router.get("/", (req, res) => {
  FILM_ID_CHOOSEN = req.query.film_id;
  CINEMA_ID_CHOOSEN = req.query.cinema_id;
  console.log(FILM_ID_CHOOSEN);
  console.log(CINEMA_ID_CHOOSEN);

  ShowTimeRepo.getAllWithCinemaAndFilm(CINEMA_ID_CHOOSEN, FILM_ID_CHOOSEN)
    .then((showtimes) => {
      const showTimeAfterFormatDate = showtimes.map((showtime) => {
        const showtimeCopy = {};

        showtimeCopy.uuid = showtime.uuid;
        showtimeCopy.time = dateUtils.reduceDateFormat(showtime.startTime, showtime.endTime);

        return showtimeCopy;
      });
      console.log(showTimeAfterFormatDate);
      res.render("ShowTime/ShowTime", { showTimeAfterFormatDate });
    })
    .catch((err) => {
      console.log(err);
      res.render("error/error");
    });
});

module.exports = router;

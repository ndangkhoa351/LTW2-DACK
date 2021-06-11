const express = require("express");
const TicketRepo = require("../../repositories/Cinema/CinemaRepo");
const router = express.Router();
let FILM_CHOOSEN;

router.get("/", (req, res) => {
  FILM_CHOOSEN = req.query.filmID;

  CinemaRepo.getAllCinemaWithFilmID(FILM_CHOOSEN)
    .then((cinemas) => {
      res.render("Cinema/Cinema", { cinemas });
    })
    .catch((err) => {
      res.send("Something Wrong here!!!");
    });
});

module.exports = router;

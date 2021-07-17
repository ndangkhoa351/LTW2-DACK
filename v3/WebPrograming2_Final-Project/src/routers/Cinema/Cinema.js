const express = require("express");
const CinemaRepo = require("../../repositories/Cinema/CinemaRepo");
const router = express.Router();
let FILM_CHOOSEN;

router.get("/", (req, res) => {
  FILM_CHOOSEN = req.query.filmID;
  console.log(FILM_CHOOSEN);
  CinemaRepo.getAllCinemaWithFilmID(FILM_CHOOSEN)
    .then((cinemas) => {
      res.render("Cinema/Cinema", { cinemas });
    })
    .catch((err) => {
      res.send("Something Wrong here!!!");
    });
});

router.get("/avatar/:id", (req, res) => {
  CinemaRepo.getByID(req.params.id).then((cinema) => {
    if (!cinema || !cinema.avatar) {
      res.status(404).send("File not found");
    } else {
      res.header("Content-Type", "image/jpeg").send(cinema.avatar);
    }
  });
});

module.exports = router;

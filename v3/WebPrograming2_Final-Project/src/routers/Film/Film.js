const express = require("express");
const FilmRepo = require("../../repositories/Film/FilmRepo");
const CinemaClusRepo = require("../../repositories/CinemaCluster/CinemaClusterRepo");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.get("/", (req, res) => {
  const filmID = req.query.filmID;
  FilmRepo.getByID(filmID)
    .then((filmChoosen) => {
      const d = new Date(filmChoosen.publishDate);
      let month = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
      let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);

      const dateFormat_publishDate = `${month} ${year}`;
      res.render("Film/Film", { filmChoosen, dateFormat_publishDate });
    })
    .catch((err) => {
      res.render("error/error");
    });
});

router.get("/poster/:id", (req, res) => {
  FilmRepo.getByID(req.params.id).then((film) => {
    if (!film || !film.poster) {
      res.status(404).send("File not found");
    } else {
      res.header("Content-Type", "image/jpeg").send(film.poster);
    }
  });
});

router.get("/avatarCinemaClus/:id", (req, res) => {
  CinemaClusRepo.getByID(req.params.id).then((cinema) => {
    if (!cinema || !cinema.avatar) {
      res.status(404).send("File not found");
    } else {
      res.header("Content-Type", "image/jpeg").send(cinema.avatar);
    }
  });
});

module.exports = router;

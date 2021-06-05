const express = require("express");
const FilmRepo = require("../../repositories/Film/FilmRepo");
const router = express.Router();

router.get("/", (req, res) => {
  // Find the films was published last 7 days ago
  FilmRepo.getAll().then((films) => {
    FilmRepo.getNewest()
      .then((newestFilms) => {
        res.render("HomePage/HomePage", { films, newestFilms });
      })
      .catch((err) => {
        res.send("Something Error!!");
      });
  });
});

module.exports = router;

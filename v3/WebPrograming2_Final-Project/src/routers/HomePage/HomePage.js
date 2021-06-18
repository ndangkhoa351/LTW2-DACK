const express = require("express");
const FilmRepo = require("../../repositories/Film/FilmRepo");
const router = express.Router();

router.get("/", (req, res) => {
  FilmRepo.getAll()
    .then((films) => {
      // Find the films was published last 7 days ago
      FilmRepo.getNewest()
        .then((newestFilms) => {
          // Find 5 films was most viewed all the time
          FilmRepo.getMostViewed()
            .then((mostViewedFilms) => {
              res.render("HomePage/HomePage", {
                mostViewedFilms,
                films,
                newestFilms, layout:'./layout'
              });
            })
            .catch((err) => {
              res.render("error/error");
            });
        })
        .catch((err) => {
          res.render("error/error");
        });
    })
    .catch((err) => {
      res.render("error/error");
    });
});

module.exports = router;

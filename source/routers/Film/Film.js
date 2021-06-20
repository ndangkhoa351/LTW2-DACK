const express = require("express");
const FilmRepo = require("../../repositories/Film/FilmRepo");
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

module.exports = router;

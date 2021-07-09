const express = require("express");
const CinemaRepo = require("../../../repositories/Cinema/CinemaRepo");
const FilmRepo = require("../../../repositories/Film/FilmRepo");
const ShowTimeRepo = require("../../../repositories/ShowTime/ShowTimeRepo");
const router = express.Router();
let SHOWTIME_ID_CHOOSEN;

router.get("/", (req, res) => {
  SHOWTIME_ID_CHOOSEN = req.query.showtimeID;
  const action = req.query.action;

  if (action == "delete") {
    ShowTimeRepo.delete(SHOWTIME_ID_CHOOSEN)
      .then((result) => {
        res.redirect("/admin/manage-showtime");
      })
      .catch((err) => {
        res.render("error/error");
      });
  } else {
    ShowTimeRepo.getAll()
      .then((showtimes) => {
        res.render("ShowTime/admin/showtime", { showtimes ,layout: 'dashboard/layout'});
      })
      .catch((err) => {
        res.render("error/error");
      });
  }
});

router.get("/add-showtime", (req, res) => {
  CinemaRepo.getAll()
    .then((cinemas) => {
      FilmRepo.getAll()
        .then((films) => {
          res.render("ShowTime/admin/add-showtime", { cinemas, films ,layout: 'dashboard/layout'});
        })
        .catch((err) => {
          res.render("error/error");
        });
    })
    .catch((err) => {
      res.render("error/error");
    });
});

router.post("/add-showtime", (req, res) => {
  const { start_time, end_time, price, cinemaId, filmId } = req.body;

  const newShowTime = {
    startTime: start_time,
    endTime: end_time,
    price: price,
    cinema_id: cinemaId,
    film_id: filmId,
  };

  ShowTimeRepo.add(newShowTime)
    .then((result) => {
      res.redirect("/admin/manage-showtime");
    })
    .catch((err) => {
      res.render("error/error");
    });
});

// Update

router.get("/update-showtime", (req, res) => {
  SHOWTIME_ID_CHOOSEN = req.query.showtimeID;

  ShowTimeRepo.getByID(SHOWTIME_ID_CHOOSEN)
    .then((showtimeMatch) => {
      CinemaRepo.getAll()
        .then((cinemas) => {
          FilmRepo.getAll()
            .then((films) => {
              res.render("ShowTime/admin/update-showtime", {
                showtimeMatch,
                cinemas,
                films,layout: 'dashboard/layout'
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

router.post("/update-showtime", (req, res) => {
  const { start_time, end_time, price, cinemaId, filmId } = req.body;

  const showtimeUpdate = {
    uuid: SHOWTIME_ID_CHOOSEN,
    startTime: start_time,
    endTime: end_time,
    price: price,
    cinema_id: cinemaId,
    film_id: filmId,
  };

  ShowTimeRepo.updateRecord(showtimeUpdate)
    .then((result) => {
      res.redirect("/admin/manage-showtime");
    })
    .catch((err) => {
      res.render("error/error");
    });
});

module.exports = router;

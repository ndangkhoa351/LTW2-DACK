const express = require("express");
const CinemaRepo = require("../../../repositories/Cinema/CinemaRepo");
const CinemaClusterRepo = require("../../../repositories/CinemaCluster/CinemaClusterRepo");
const router = express.Router();
let CINEMA_ID_CHOOSEN;

router.get("/", (req, res) => {
  CINEMA_ID_CHOOSEN = req.query.cinemaID;
  const action = req.query.action;

  if (action == "delete") {
    CinemaRepo.delete(CINEMA_ID_CHOOSEN)
      .then((result) => {
        res.redirect("/admin/manage-cinema");
      })
      .catch((err) => {
        res.render("error/error");
      });
  } else {
    CinemaRepo.getAll()
      .then((cinemas) => {
        res.render("Cinema/admin/cinema", { cinemas ,layout: 'dashboard/layout' });
      })
      .catch((err) => {
        res.render("error/error");
      });
  }
});

router.get("/add-cinema", (req, res) => {
  CinemaClusterRepo.getAll()
    .then((clusters) => {
        res.render("Cinema/admin/add-cinema", { clusters, layout: 'dashboard/layout'});
    })
    .catch((err) => console.log(err));
});

router.post("/add-cinema", (req, res) => {
  const {
    cinema_name,
    cinema_type,
    cinema_hsize,
    cinema_vsize,
    cinema_owner_cluster,
  } = req.body;

  const newCinema = {
    displayName: cinema_name,
    type: cinema_type,
    horizontalSize: cinema_hsize,
    verticleSize: cinema_vsize,
    ownerCluster_id: cinema_owner_cluster,
  };

  CinemaRepo.add(newCinema)
    .then((result) => {
      res.redirect("/admin/manage-cinema");
    })
    .catch((err) => {
      res.render("error/error");
    });
});

// Update

router.get("/update-cinema", (req, res) => {
  CINEMA_ID_CHOOSEN = req.query.cinemaID;

  CinemaRepo.getByID(CINEMA_ID_CHOOSEN)
    .then((cinema) => {
      CinemaClusterRepo.getAll()
        .then((clusters) => {
          res.render("Cinema/admin/update-cinema", { cinema, clusters });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      res.render("error/error");
    });
});

router.post("/update-cinema", (req, res) => {
  const { cinema_name, cinema_type, cinema_hsize, cinema_vsize, cinema_owner_cluster } = req.body;

  const cinemaUpdate = {
    uuid: CINEMA_ID_CHOOSEN,
    displayName: cinema_name,
    type: cinema_type,
    horizontalSize: cinema_hsize,
    verticleSize: cinema_vsize,
    ownerCluster_id: cinema_owner_cluster,
  };

  CinemaRepo.updateRecord(cinemaUpdate)
    .then((result) => {
      res.redirect("/admin/manage-cinema");
    })
    .catch((err) => {
      res.render("error/error");
    });
});

module.exports = router;

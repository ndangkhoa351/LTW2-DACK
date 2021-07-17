const { promisify } = require("util");
const express = require("express");
const rename = promisify(require("fs").rename);
const CinemaRepo = require("../../../repositories/Cinema/CinemaRepo");
const CinemaClusterRepo = require("../../../repositories/CinemaCluster/CinemaClusterRepo");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();
let CINEMA_ID_CHOOSEN;
const middleware = require("../../../middlewares/authenticationAdmin");

router.use(middleware);

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
    CinemaRepo.getAllInfo()
      .then((cinemas) => {
        res.render("Cinema/admin/cinema", { cinemas ,layout: 'dashboard/layout' });
      })
      .catch((err) => {
        res.render("error/error");
      });
  }
});

router.get("/add-cinema", (req, res) => {
  CinemaRepo.getAllInfo()
    .then((cinemas) => {
      CinemaClusterRepo.getAll()
      .then((clusters)=>{
        res.render("Cinema/admin/add-cinema", { cinemas,clusters, layout: 'dashboard/layout'});
      })
    })
    .catch((err) => console.log(err));
});

router.post("/add-cinema",upload.single("avatar"), async (req, res)  => {
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
    avatar: req.file.buffer,
  };
  console.log(newCinema);
  CinemaRepo.add(newCinema)
    .then((result) => {
      res.status(200).redirect("/admin/manage-cinema");
    })
    .catch((err) => {
      res.status(500).render("error/error");
    });
});

// Update

router.get("/update-cinema", (req, res) => {
  CINEMA_ID_CHOOSEN = req.query.cinemaID;

  CinemaRepo.getByID(CINEMA_ID_CHOOSEN)
    .then((cinema) => {
      CinemaClusterRepo.getAll()
        .then((clusters) => {
          res.render("Cinema/admin/update-cinema", { cinema, clusters,  layout: 'dashboard/layout'});
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      res.render("error/error");
    });
});

router.post("/update-cinema",  upload.single("avatar"), async (req, res) => {
  const { cinema_name, cinema_type, cinema_hsize, cinema_vsize, cinema_owner_cluster } = req.body;
  const imageFile = req.file ? req.file.buffer : avatar;
  const cinemaUpdate = {
    uuid: CINEMA_ID_CHOOSEN,
    displayName: cinema_name,
    type: cinema_type,
    horizontalSize: cinema_hsize,
    verticleSize: cinema_vsize,
    ownerCluster_id: cinema_owner_cluster,
    avatar: imageFile
  };

  CinemaRepo.updateRecord(cinemaUpdate)
    .then((result) => {
      res.redirect("/admin/manage-cinema");
    })
    .catch((err) => {
      res.render("error/error");
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

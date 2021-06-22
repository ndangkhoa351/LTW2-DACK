const express = require("express");
const UserRepo = require("../../../repositories/User/UserRepo");

const router = express.Router();

router.get("/", (req, res, next) => {
  UserRepo.getAll()
    .then((users) => {
      res.render("User/admin/manage-user", { users ,layout: 'dashboard/layout'});
    })
    .catch((err) => {
      next();
    });
});
router.get("/manage-user", (req, res, next) => {
  UserRepo.getAll()
    .then((users) => {
      res.render("User/admin/manage-user", { users ,layout: 'dashboard/layout'});
    })
    .catch((err) => {
      next();
    });
});

module.exports = router;

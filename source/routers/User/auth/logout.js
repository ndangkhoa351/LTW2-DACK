const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  delete req.session.userID; //delete current user session.
  res.redirect("/");
});

module.exports = router;

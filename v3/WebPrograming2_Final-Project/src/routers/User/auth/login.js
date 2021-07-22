const express = require("express");
const UserRepo = require("../../../repositories/User/UserRepo");
const router = express.Router();
const bcrypt = require("bcrypt");
const authUtils = require("../../../utils/User/auth/authentication");
require("dotenv").config(); //IMPORTANT

router.post("/", async (req, res) => {
  const { user_email, user_password } = req.body;

  UserRepo.getByEmail(user_email)
    .then((result) => {
      if (bcrypt.compareSync(user_password, result.password)) {
        req.currentUser = result;
        req.session.userID = result.uuid;

        //nav to home page
        if(authUtils.isAdmin(req.currentUser)){
          res.redirect("/admin/manage-film/report");
        }
        else{
          res.redirect("/");
        }
      } else {
        res.render('error/login-fail');
      }
    })
    .catch((err) => {
      res.send("Not Correct Email, Please Try Again");
    });
});

module.exports = router;

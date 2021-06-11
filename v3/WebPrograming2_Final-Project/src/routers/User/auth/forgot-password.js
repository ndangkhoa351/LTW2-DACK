const express = require("express");
const nodemailer = require("nodemailer");
const UserRepo = require("../../../repositories/User/UserRepo");
const router = express.Router();
const tokenVerify = 1;
let EMAIL;

router.get("/re-enter-email", (req, res) => {
  res.render("User/auth/forgot-password");
});

router.get("/re-enter-email/:token*", (req, res) => {
  const tokenRespond = req.params["token"];

  const isMatchToken = tokenRespond == tokenVerify;
  console.log(isMatchToken);

  if (isMatchToken) {
  }
});

router.post("/re-enter-mail", (req, res) => {
  const { re_enter_email } = req.body;
  EMAIL = re_enter_email;

  UserRepo.getByEmail(re_enter_email)
    .then((result) => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL, // Real email
          pass: process.env.PASSWORD, // Real Email Password
        },
      });

      const mailOptions = {
        from: "", // Your own email
        to: re_enter_email,
        subject: "Verify Email",
        html: `Please enter <a href="http://localhost:3000/forgot-password/${tokenVerify}">this</a> link to verify account`,
      };
      transporter
        .sendMail(mailOptions)
        .then((respond) => {
          res.send("Please Check your email");
        })
        .catch((err) => res.send("Error: " + err));
    })
    .catch((err) => {
      console.log(err);
      res.render("error/error");
    });
});

router.get('/enter-new-password', function(req, res) {
  EMAIL = req.query.email;
  res.render('User/auth/forgot-password/enter-new-password');
});

router.post('/enter-new-password', function(req, res) {
  const {new_password, new_password_re_enter} = req.body;

  if(authUtils.isTheSame(new_password, new_password_re_enter)) {
      UserRepo.updatePasswordByEmail(new_password_re_enter).then(result => {
          console.log("Update Success")
          res.redirect('/');
      })
      .catch(err => {
          console.log(err);
      })
  }
});

module.exports = router;

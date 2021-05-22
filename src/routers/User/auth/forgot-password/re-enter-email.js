const express = require('express');
const nodemailer = require('nodemailer');
const UserRepo = require('../../../../repositories/User/UserRepo');
const router = express.Router();
const tokenVerify = 1;
let EMAIL;

router.get('/', (req, res) => {
    res.render('User/auth/forgot-password/re-enter-email');
});

router.get('/:token*', (req, res) => {
    const tokenRespond = req.params['token'];
    
    const isMatchToken = (tokenRespond == tokenVerify);
    console.log(isMatchToken);

    if(isMatchToken) {
        res.redirect(`/forgot-password/set-new-password?email=${EMAIL}`);
    }
})

router.post('/', (req, res) => {
    const {re_enter_email} = req.body;
    EMAIL = re_enter_email;

    UserRepo.getByEmail(re_enter_email)
      .then(result => {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: '', // Real email
              pass: '' // Real Email Password
            }
          });
          
          const mailOptions = {
            from: "",   // Your own email    
            to: re_enter_email,
            subject: "Verify Email",
            html: `Please enter <a href="http://localhost:3000/forgot-password/re-enter-email/${tokenVerify}">this</a> link to verify account`,
          };
        transporter.sendMail(mailOptions)
            .then((respond) => {
                res.send("Please Check your email");
            })
            .catch(err => res.send("Error: " + err));
      })
      .catch(err => {
          console.log(err);
          res.redirect('/forgot-password/set-new-password');
      });
});

module.exports = router;
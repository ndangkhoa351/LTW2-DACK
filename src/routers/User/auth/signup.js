
const express = require('express');
const UserRepo = require('../../../repositories/User/UserRepo');
const authUtils = require('../../../utils/User/auth/authentication');
const nodemailer = require('nodemailer');
const router = express.Router();
let EMAIL;
let PASSWORD;
let FULLNAME;
const tokenVerify = 1;

router.get('/', (req, res) => {
    res.render('User/auth/signup');
});

router.get('/:token*', function(req, res) {
    var tokenRespond = req.params['token'];

    const isTheSameToken = (tokenRespond == tokenVerify);

    if(isTheSameToken) {
        const new_user = {
            email: EMAIL,
            password: PASSWORD,
            displayName: FULLNAME,
        }
        UserRepo.add(new_user).then((result) => {
            res.send("Regist Success");
        }).catch((err) => {
            console.log(err);
        });
    }
});


router.post('/', (req, res) => {
    const {register_email, register_password, register_full_name, register_confirm_password} = req.body;

    EMAIL = register_email;
    PASSWORD = register_password;
    FULLNAME = register_full_name;

    if(authUtils.isNotEmpty(register_email) && authUtils.isNotEmpty(register_password) && authUtils.isNotEmpty(register_confirm_password)) {
        if(authUtils.isTheSame(register_password, register_confirm_password)) {
            
            //mail to the registered email.
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: '', // Real email
                  pass: '' // Real Email Password
                }
              });
              
              const mailOptions = {
                from: "",  // Your own email  
                to: register_email,
                subject: "Verify Email",
                html: `Please enter <a href="http://localhost:3000/signup/${tokenVerify}">this</a> link to verify account`,
              };
              
            transporter.sendMail(mailOptions)
                .then((respond) => {
                    res.send("Please Check your email");
                })
                .catch(err => res.send("Error: " + err));
        }
    }
});

module.exports = router;
const express = require('express');
const UserRepo = require('../../../repositories/User/UserRepo');
const authUtils = require('../../../utils/User/auth/authentication');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();
let EMAIL;
let PASSWORD;
let FULLNAME;
let PHONE;
let tokenVerify = 1;

router.get('/:token', function (req, res) {
    var tokenRespond = req.params.token;

    //const isTheSameToken = bcrypt.compareSync(EMAIL, tokenRespond);
    const isTheSameToken = tokenRespond == tokenVerify;
    if (isTheSameToken) {
        const new_user = {
            email: EMAIL,
            password: PASSWORD,
            displayName: FULLNAME,
            phone: PHONE,
        };
        UserRepo.add(new_user)
            .then((result) => {
                res.redirect('/');
            })
            .catch((err) => {
                console.log(err);
            });
    }
});

router.post('/', (req, res) => {
    const {
        register_email,
        register_password,
        register_full_name,
        register_confirm_password,
        register_phone,
    } = req.body;

    EMAIL = register_email;
    PASSWORD = register_password;
    FULLNAME = register_full_name;
    PHONE = register_phone;

    if (
        authUtils.isNotEmpty(register_email) &&
        authUtils.isNotEmpty(register_password) &&
        authUtils.isNotEmpty(register_confirm_password)
    ) {
        if (authUtils.isTheSame(register_password, register_confirm_password)) {
            //tokenVerify = bcrypt.hashSync(register_email, 10);

            //mail to the registered email.
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL, // Real email
                    pass: process.env.PASSWORD, // Real Email Password
                },
            });

            const mailOptions = {
                from: process.env.GMAIL,
                to: register_email,
                subject: 'Verify Email',
                html: `Please enter <a href="http://localhost:3000/signup/${tokenVerify}">this</a> link to verify account`,
            };

            transporter
                .sendMail(mailOptions)
                .then((respond) => {
                    res.render('successMessage/check-email');
                })
                .catch((err) => res.send('Error: ' + err));
        }
    }
});

module.exports = router;

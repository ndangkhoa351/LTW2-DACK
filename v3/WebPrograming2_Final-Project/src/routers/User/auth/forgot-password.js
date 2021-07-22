const express = require('express');
const nodemailer = require('nodemailer');
const UserRepo = require('../../../repositories/User/UserRepo');
const authUtils = require('../../../utils/User/auth/authentication');
const router = express.Router();
const tokenVerify = 1;
let EMAIL;
require('dotenv').config();

router.get('/re-enter-email/:token*', (req, res) => {
    const tokenRespond = req.params['token'];
    EMAIL = req.query.email;

    const isMatchToken = tokenRespond == tokenVerify;
    console.log(isMatchToken);

    if (isMatchToken) {
        res.redirect(`/forgot-password/enter-new-password?email=${EMAIL}`);
    }
});

router.post('/re-enter-email', (req, res) => {
    const { re_enter_email } = req.body;
    EMAIL = re_enter_email;

    UserRepo.getByEmail(re_enter_email)
        .then((result) => {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'ltweb222021@gmail.com', // Real email
                    pass: 'ABCxyz123~', // Real Email Password
                },
            });

            const mailOptions = {
                from: 'ltweb222021@gmail.com', // Your own email
                to: re_enter_email,
                subject: 'Get Account Back',
                html: `Please enter <a href="http://localhost:3000/forgot-password/re-enter-email/${tokenVerify}?email=${re_enter_email}">this</a> link to get your account back`,
            };
            transporter
                .sendMail(mailOptions)
                .then((respond) => {
                    res.render('successMessage/check-email');
                })
                .catch((err) => res.send('Error: ' + err));
        })
        .catch((err) => {
            console.log(err);
            res.render('error/error');
        });
});

router.get('/enter-new-password', (req, res) => {
    const qEmail = req.query.email;
    res.render('User/auth/forgot-password/enter-new-password', { qEmail });
});

router.post('/enter-new-password', function (req, res) {
    const { _email, new_password, new_password_re_enter } = req.body;

    if (authUtils.isTheSame(new_password, new_password_re_enter)) {
        UserRepo.updatePasswordByEmail(EMAIL, new_password)
            .then((result) => {
                console.log('Update Successful');
                res.redirect('/');
            })
            .catch((err) => {
                console.log(err);
            });
    }
});

module.exports = router;

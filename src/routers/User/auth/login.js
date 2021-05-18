
const express = require('express');
const UserRepo = require('../../../repositories/User/UserRepo');
const router = express.Router();



router.get('/', (req, res) => {
    res.render('User/auth/login');
});

router.post('/', (req, res) => {
    const {user_email, user_password} = req.body;

    UserRepo.getByEmail(user_email).then((result) => {
        if(result.password === user_password) {
            //nav to home page
            res.send("okie nhoaa");
        }
    }).catch((err) => {
        
    });
});

module.exports = router;
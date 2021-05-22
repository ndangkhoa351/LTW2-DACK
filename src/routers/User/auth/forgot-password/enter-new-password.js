const express = require('express');
const authUtils = require('../../../../utils/User/auth/authentication');
const UserRepo = require('../../../../repositories/User/UserRepo');
const router = express.Router();
let EMAIL;

router.get('/', function(req, res) {
    EMAIL = req.query.email;
    res.render('User/auth/forgot-password/enter-new-password');
});

router.post('/', function(req, res) {
    const {new_password, new_password_re_enter} = req.body;

    if(authUtils.isTheSame(new_password, new_password_re_enter)) {
        UserRepo.updatePasswordByEmail(new_password_re_enter).then(result => {
            res.send("Update Successful");
        })
        .catch(err => {
            console.log(err);
        })
    }
});

module.exports = router;
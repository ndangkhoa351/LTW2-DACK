const express = require('express');
const UserRepo = require('../../../../repositories/User/UserRepo');
const router = express.Router();

router.get('/', (req, res, next) => {

    UserRepo.getAll().then((users) => {
        res.render('User/profile/admin/manage-user', {users});
    }).catch((err) => {
       next();         
    });
});

module.exports = router;
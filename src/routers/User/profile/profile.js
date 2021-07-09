const express = require('express');
const UserRepo = require('./../../../repositories/User/UserRepo');
const router = express.Router();

router.get('/', (req, res) => {
    const currentUserID = req.session.userID;

    UserRepo.getByID(currentUserID)
        .then((currentUser) => {
            res.render('User/profile/profile', { currentUser });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post('/', (req, res) => {
    console.log(req.file);
    const { fullname_update, phone_update } = req.body;

    const updateDetail = {
        uuid: req.currentUser.uuid, // pass uuid of current user to user update to update all fields of that user.
        displayName: fullname_update,
        phone: phone_update,
    };

    console.log(updateDetail);

    UserRepo.updateRecord(updateDetail)
        .then((result) => {
            console.log('Update Successful');
            res.redirect('/profile');
        })
        .catch((err) => {
            res.send(
                "Can't update your profile, may had something wrong inside the server, please try again later"
            );
        });
});

module.exports = router;

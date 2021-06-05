const express = require('express');
const UserRepo = require('./../../../repositories/User/UserRepo');
const router = express.Router();

router.get('/', (req, res) => {
    const currentUserID = req.session.userID;

    UserRepo.getByID(currentUserID).then(currentUser => {
        res.render('User/profile/profile', {currentUser});
    })
    .catch(err => {
        console.log(err);
    });
})

router.post('/', (req, res) => {
    const {email_update, password_update, fullname_update, phone_update} = req.body;

    const user_update = {
        uuid: req.currentUser.uuid,    // pass uuid of current user to user update to update all fields of that user.
        email: email_update,
        password: password_update,
        displayName: fullname_update,
        phone: phone_update,
    }

    UserRepo.updateRecord(user_update).then(result => {
        res.send("Update Successful");
    })
    .catch(err => {
        res.send("Can't update your profile, may had something wrong inside the server, please try again later");
    })
})

module.exports = router;
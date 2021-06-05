const express = require('express');
const router = express.Router();
let FILM_ID_BOOKING; 

router.get('/', (req, res) => {
    const currentUser = req.currentUser;
    // not login yet
    if(!currentUser) {
        res.redirect('/login');
    }
    // get Film ID booking.
    FILM_ID_BOOKING = req.params.filmID;
    res.render('Booking/Booking');
})

router.post('/', (req, res) => {
    
})

module.exports = router;
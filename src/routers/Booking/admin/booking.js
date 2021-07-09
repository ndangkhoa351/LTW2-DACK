const express = require('express');
const BookingRepo = require('../../../repositories/Booking/BookingRepo');
const router = express.Router();
let BOOKING_ID_CHOOSEN; 

router.get('/', (req, res) => {
    BOOKING_ID_CHOOSEN = req.query.bookingID;
    const action = req.query.action;

    if(action == "delete") {
        BookingRepo.delete(BOOKING_ID_CHOOSEN).then(result => {
            res.redirect('/admin/manage-booking');
        })
        .catch(err => { res.render('error/error'); });
    }
    else {
        BookingRepo.getAll().then((bookings) => {
            res.render('Booking/admin/booking', {bookings,layout: 'dashboard/layout'});
        }).catch((err) => {
            res.render('error/error');
        });
    }
});


router.post('/', (req, res) => {
    
})

module.exports = router;
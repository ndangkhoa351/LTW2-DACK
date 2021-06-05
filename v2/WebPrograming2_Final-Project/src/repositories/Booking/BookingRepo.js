const Booking = require('../../models/Booking/Booking');

Booking.getByID = async function(id) {
    return Booking.findByPk(id);
}

Booking.getAll = async function() {
    return Booking.findAll();
}

Booking.add = async function(new_booking) {
    const newBooking = await Booking.create({
            user_id: new_booking.user_id,
            showtime_id : new_booking.showtime_id,
            bookTime: new_booking.bookTime,
            totalMoney: new_booking.totalMoney,
        });
    await newBooking.save();
    return newBooking;
}

Booking.delete = async function(booking_id_delete) {
    await Booking.destroy({
        where: {uuid: booking_id_delete}
    })
}

// Booking.update = async function(uid_to_update, email_update, password_update, displayName_update) {
//     await Booking.update({email: email_update, password: password_update, displayName: displayName_update}, {
//         where: {id: uid_to_update}
//     });
// };

module.exports = Booking;
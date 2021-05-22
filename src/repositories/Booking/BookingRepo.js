const Booking = require('../../models/Booking/Booking');

Booking.getByID = async function(id) {
    return Booking.findByPk(id);
}

Booking.getAll = async function() {
    return Booking.findAll();
}

Booking.add = async function(new_user) {
    const newUser = await Booking.create({
            email: new_user.email,
            password: new_user.password,
            displayName: new_user.displayName,
            role: "guest",
        });
    await newUser.save();
    return newUser;
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
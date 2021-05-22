const Film = require('../../models/Film/Film');

Film.getByID = async function(id) {
    return Film.findByPk(id);
}

Film.getAll = async function() {
    return Film.findAll();
}

Film.add = async function(new_user) {
    const newUser = await Film.create({
            email: new_user.email,
            password: new_user.password,
            displayName: new_user.displayName,
            role: "guest",
        });
    await newUser.save();
    return newUser;
}

Film.delete = async function(film_id_delete) {
    await Film.destroy({
        where: {uuid: film_id_delete}
    })
}

// Film.update = async function(uid_to_update, email_update, password_update, displayName_update) {
//     await Film.update({email: email_update, password: password_update, displayName: displayName_update}, {
//         where: {id: uid_to_update}
//     });
// };

module.exports = Film;
const CinemaCluster = require('../../models/CinemaCluster/CinemaCluster');

CinemaCluster.getByID = async function(id) {
    return CinemaCluster.findByPk(id);
}

CinemaCluster.getAll = async function() {
    return CinemaCluster.findAll();
}

CinemaCluster.add = async function(new_user) {
    const newUser = await CinemaCluster.create({
            email: new_user.email,
            password: new_user.password,
            displayName: new_user.displayName,
            role: "guest",
        });
    await newUser.save();
    return newUser;
}

CinemaCluster.delete = async function(cinemaCluster_id_delete) {
    await CinemaCluster.destroy({
        where: {uuid: cinemaCluster_id_delete}
    })
}

// CinemaCluster.update = async function(uid_to_update, email_update, password_update, displayName_update) {
//     await CinemaCluster.update({email: email_update, password: password_update, displayName: displayName_update}, {
//         where: {id: uid_to_update}
//     });
// };

module.exports = CinemaCluster;
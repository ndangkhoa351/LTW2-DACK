const Cinema = require('../../models/Cinema/Cinema');
let sequelize = require('../../config/database');
const { QueryTypes } = require('sequelize');

Cinema.getByID = async function(id) {
    return Cinema.findByPk(id);
}

Cinema.getAll = async function() {
    return Cinema.findAll();
}

Cinema.add = async function(new_cinema) {
    const newCinema = await Cinema.create({
            displayName: new_cinema.displayName,
            cinemaType: new_cinema.cinemaType,
            horizontalSize: new_cinema.horizontalSize,
            verticleSize: new_cinema.verticleSize,
        });
    await newCinema.save();
    return newCinema;
}

Cinema.delete = async function(cinema_id_delete) {
    await Cinema.destroy({
        where: {uuid: cinema_id_delete}
    })
}

Cinema.getAllCinemaWithFilmID = async function(film_id) {
    const cinemas = await sequelize.query(`SELECT c.* FROM cinemas c JOIN showtimes s on c.uuid = s.cinema_id JOIN films f on f.uuid = s.film_id WHERE f.uuid = '${film_id}'`, {type: QueryTypes.SELECT});
    return cinemas;
}


// Cinema.update = async function(uid_to_update, email_update, password_update, displayName_update) {
//     await Cinema.update({email: email_update, password: password_update, displayName: displayName_update}, {
//         where: {id: uid_to_update}
//     });
// };

module.exports = Cinema;
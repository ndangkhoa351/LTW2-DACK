const { Sequelize } = require('sequelize');
const Film = require('../../models/Film/Film');
const Op = Sequelize.Op;

// --------------------------------- BASIC QUERY  ---------------------------------

Film.getByID = async function(id) {
    return Film.findByPk(id);
}

Film.getAll = async function() {
    return Film.findAll();
}

Film.add = async function(new_film) {
    const newFilm = await Film.create({
            displayName: new_film.displayName,
            publishDate: new_film.publishDate,
            time: new_film.time,
        });
    await newFilm.save();
    return newFilm;
}

Film.delete = async function(film_id_delete) {
    await Film.destroy({
        where: {uuid: film_id_delete}
    })
}

Film.updateRecord = async function(film_update) {
    try {
        const newFilmDetail = {
            displayName: film_update.displayName,
            publishDate: film_update.publishDate,
            time: film_update.time,
        };
    
        Film.update(newFilmDetail, 
            {
                where: {uuid: film_update.uuid}
            });
    } catch (error) {
        console.log(error);
    }
}

// Film.update = async function(uid_to_update, email_update, password_update, displayName_update) {
//     await Film.update({email: email_update, password: password_update, displayName: displayName_update}, {
//         where: {id: uid_to_update}
//     });
// };

// --------------------------------- ADVANCED QUERY  ---------------------------------

Film.getNewest = async function() {
    return  Film.findAll({
                where: {
                        publishDate: {
                            // new Date() return the current date.
                            [Op.gte]: new Date() - (7 * 24 * 60 * 60 * 1000),           //7 days
                    }
                }
            })
}



module.exports = Film;
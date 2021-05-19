const Film = require('../../models/Film/Film');


Film.getByID = async function(id) {
    return Film.findByPk(id);
}

Film.getAll = async function() {
    return Film.findAll();
}

Film.findName = async function(name) {
    return Film.findAll({where: {displayName: LIKE `%${name}%`}});
}
//
Film.add = async function(new_film) {
    const newFilm = await Film.create({
        displayName: newFilm.displayName,
        premiereDate: newFilm.premiereDate,
        poster: newFilm.poster,
        movieDuration: newFilm.movieDuration,
        });
    await newFilm.save();
    return newFilm;
}

Film.delete = async function(id_delete) {
    await Film.destroy({
        where: {id: id_delete}
    })
}

Film.update = async function(id,displayName, premiereDate, poster, movieDuration) {
    await Film.update({displayName, premiereDate,poster,movieDuration}, {
        where: {id,}
    })
};

module.exports = Film;
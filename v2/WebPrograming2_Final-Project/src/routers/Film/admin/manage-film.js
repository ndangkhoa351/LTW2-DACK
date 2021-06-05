const express = require('express');
const FilmRepo = require('../../../repositories/Film/FilmRepo');
const router = express.Router();

router.get('/', (req, res) => {
    FILM_ID_CHOOSEN = req.query.filmID;
    const action = req.query.action;

    if(action == "delete") {
        FilmRepo.delete(FILM_ID_CHOOSEN).then(result => {
            res.redirect('/admin/manage-film');
        })
        .catch(err => { res.render('error/error'); });
    }
    // none of above - default.
    else {  
        FilmRepo.getAll().then((films) => {
            res.render('Film/admin/manage-film', {films});
        }).catch((err) => {
            res.render('error/error');
        });
    }    
});

// Add Film
router.get('/add-film', (req, res) => {
    res.render('Film/admin/add-film');
});

router.post('/add-film', (req, res) => {
    const {film_name, film_pdate, film_time} = req.body;

    console.log(film_name);
    console.log(film_pdate);
    console.log(film_time);


    const oNewFilm = {
        displayName: film_name,
        publishDate: film_pdate,
        time: film_time,
    };

    FilmRepo.add(oNewFilm).then(result => {
        res.redirect('/admin/manage-film');
    })
    .catch(err => {
        res.render('error/error');
    })
});

// Update Film
router.get('/update-film', (req, res) => {
    const filmIDChoosen = req.query.filmID;

    FilmRepo.getByID(filmIDChoosen)
    .then(filmMatch => {
        res.render('Film/admin/update-film', {filmMatch});
    })
    .catch(err => {
        res.render('error/error');
    });
});

router.post('/update-film', (req, res) => {
    const {film_uuid, film_name, film_pdate, film_time} = req.body;

    const oNewFilmUpdated = {
        uuid: film_uuid,
        displayName: film_name,
        publishDate: film_pdate,
        time: film_time,
    };

    console.log("It's came here");


    FilmRepo.updateRecord(oNewFilmUpdated).then(result => {
        res.redirect('/admin/manage-film');
    })
    .catch(err => {
        res.render('error/error');
    })
});

module.exports = router;
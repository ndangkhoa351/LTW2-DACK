const express = require('express');
const FilmRepo = require('../../repositories/Film/FilmRepo');
const clusterRepo = require('../../repositories/CinemaCluster/CinemaClusterRepo');
const router = express.Router();

router.get('/', (req, res) => {

    //const filmName = getParameterURLByName("film_name");
    const filmName = req.query.film_name;
    if(filmName === undefined)
    {
        FilmRepo.getAll()
        .then((films) => {
            res.render('HomePage/search', { 
                filmName : null,
                films,
            });
        })
        .catch((err) => {
            res.render('error/error');
        });
    }
    else{
        FilmRepo.getByName(filmName)
        .then((films) => {
            res.render('HomePage/search', { 
                filmName,
                films,
            });
        })
        .catch((err) => {
            res.render('error/error');
        });
    }
    
});

router.get('/cluster', (req, res) => {

    const filmID = req.query.film_Id;
    const filmName = req.query.film_Name;
    FilmRepo.getCinemaCluster(filmID)
        .then((cluster) => {
            res.render('HomePage/searchCluster', { 
                filmID,
                filmName,
                cluster,
            });
        })
        .catch((err) => {
            res.render('error/error');
        });
});

router.get('/showtimes', async (req, res) => {

    const filmID = req.query.film_Id;
    const clusterID = req.query.cluster_Id;

    const clusterName = await clusterRepo.getByID(clusterID);
    const FilmName = await FilmRepo.getByID(filmID);

    FilmRepo.getShowtimes(filmID, clusterID)
        .then((cinemas) => {
            res.render('HomePage/searchShowtime', { 
                filmID,
                clusterName,
                FilmName,
                cinemas,
            });
        })
        .catch((err) => {
            res.render('error/error');
        });
});

module.exports = router;
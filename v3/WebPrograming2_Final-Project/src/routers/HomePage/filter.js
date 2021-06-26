const express = require('express');
const FilmRepo = require('../../repositories/Film/FilmRepo');
const clusterRepo = require('../../repositories/CinemaCluster/CinemaClusterRepo');
const router = express.Router();

router.get('/', (req, res) => {
    clusterRepo.getAll()
        .then((clusters) => {
            res.render('HomePage/filter', { 
                clusters,
            });
        })
        .catch((err) => {
            res.render('error/error');
        });  
});

router.get('/cinemas', async (req, res) => {
    const cluster_Id = req.query.cluster_Id;
    var showtimes = [];
    clusterRepo.getCinemas(cluster_Id)
        .then((cinemas) => {
            if(cinemas.length === 0){
                res.send("Cái cụm này chưa có cái rạp nào");
            }

            cinemas.forEach(element => {
                FilmRepo.getShowtimesByCinema(element.uuid).then((show) => {
                    showtimes.push(show);
                   
                    
                    if(showtimes.length === cinemas.length){
                      
                        res.render('HomePage/filterCinema', { 
                            cinemas,
                            showtimes,
                        });
                    }
                });
            })
        })
        .catch((err) => {
            res.render('error/error');
        });  
});
module.exports = router;
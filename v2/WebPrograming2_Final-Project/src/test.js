const CinemaRepo = require('./repositories/Cinema/CinemaRepo');

CinemaRepo.getAllCinemaWithFilmID("5e3c19b6-4ff4-41a5-8555-bb439c59e401").then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});
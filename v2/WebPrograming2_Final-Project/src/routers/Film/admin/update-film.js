const express = require('express');
const FilmRepo = require('../../../repositories/Film/FilmRepo');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('Film/admin/update-film');
});


module.exports = router;
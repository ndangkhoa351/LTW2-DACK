const UserRepo = require('../repositories/User/UserRepo');

module.exports = function auth(req, res, next) {
    const { userID } = req.session;
    res.locals.currentUser = null;

    if(userID) {
        UserRepo.getByID(userID).then((user) => {
            req.currentUser = user;
            res.locals.currentUser = user;
            
            next();
        }).catch(next);
    }
    else
        next();
}